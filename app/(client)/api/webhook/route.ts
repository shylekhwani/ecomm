import { Metadata } from "@/actions/createCheckoutSession"; // Import the Metadata interface from your checkout session creator
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient"; // Backend Sanity client for creating/updating documents
// Next.js helpers for reading request headers & sending responses
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


// POST handler for /api/webhook — Stripe will send events here
export async function POST(req: NextRequest) {
  // Stripe requires raw request body to verify the signature
  const body = await req.text();

  // Grab all request headers
  const headersList = await headers();

  // Get Stripe's signature header (sent in every webhook request)
  const sig = headersList.get("stripe-signature");

  console.log("body", body, "headers:", headersList, "sig:", sig);

  // If Stripe signature is missing → reject request
  if (!sig) {
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 }
    );
  }

  // Get the webhook secret from .env
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  // This will hold the verified Stripe event
  let event: Stripe.Event;

  // Verify the event came from Stripe (checks signature + payload)
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  // Handle the specific event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve invoice if available
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    // Create order in Sanity & update stock
    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in sanity:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 400 }
      );
    }
  }

  // Always return 200 OK so Stripe doesn’t retry
  return NextResponse.json({ received: true });
}

// Helper to create an order document in Sanity
async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  // Destructure needed session details
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  // Extract and parse metadata (address is stored as JSON string)
  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata as unknown as Metadata & { address: string };
  const parsedAddress = address ? JSON.parse(address) : null;

  // Get the purchased products with their IDs
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] } // Expands Stripe's product object to get metadata
  );

  // Prepare order's product references & stock changes
  const sanityProducts = [];
  const stockUpdates = [];

  for (const item of lineItemsWithProduct.data) {
    // Get Sanity product ID from Stripe's product metadata
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if (!productId) continue;

    // Push formatted product reference for the Sanity order document
    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });

    // Push stock change instruction
    stockUpdates.push({ productId, quantity });
  }

  // Create the order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail, // Might actually be the email instead of the ID
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  });

  // Reduce stock levels for purchased products
  await updateStockLevels(stockUpdates);

  return order;
}

// Function to update stock levels in Sanity
async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      // Get current product document
      const product = await backendClient.getDocument(productId);

      // If no product or invalid stock → skip
      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`
        );
        continue;
      }

      // Calculate new stock but prevent going below 0
      const newStock = Math.max(product.stock - quantity, 0);

      // Update product stock in Sanity
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
};


 /*
  ** How It Works (Flow) **
1. Stripe sends an event (e.g., checkout completed) → your [/api/webhook] route receives it.
2. The handler reads the "raw body" and "Stripe-Signature header".
3. It verifies the event using [stripe.webhooks.constructEvent].
4. If the event is [checkout.session.completed:]
   - Fetches the session and invoice from Stripe.
   - Gets all purchased products & their Sanity IDs from Stripe metadata.
   - Creates a new "order" document in Sanity.
   - Updates stock for each product.
5. Responds with { received: true } so Stripe knows the webhook was handled successfully.
  */