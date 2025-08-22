"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react"; // Suspense for lazy loading
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams(); // Get URL search parameters (?orderNumber=1234 etc.)
  const orderNumber = searchParams.get("orderNumber"); // Extract orderNumber from URL.

  useEffect(() => {
    if (orderNumber) { // If orderNumber exists in URL, reset the cart
      resetCart();
    }
  }, [orderNumber, resetCart]);

  return (
     <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start faded & moved down
        animate={{ opacity: 1, y: 0 }} // Animate to visible & normal position
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl flex flex-col gap-8 shadow-2xl p-6 max-w-xl w-full text-center"
      >
        {/* Animated check icon in a black circle */}
        <motion.div
          initial={{ scale: 0 }} // Start shrunk
          animate={{ scale: 1 }} // Grow to full size
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="text-white w-10 h-10" /> {/* White checkmark */}
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        {/* Order message */}
        <div className="space-y-4 mb-4 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-gray-700">
            Order Number:{" "}
            <span className="text-black font-semibold">{orderNumber}</span>
            {/* Shows the order number from URL */}
          </p>
        </div>

        {/* Buttons for navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Home button */}
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>

          {/* Orders page */}
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-[#3b9c3c] text-black border border-[#3b9c3c] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>

          {/* Shop button */}
          <Link
            href="/shop"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// ✅ Wrap content in Suspense for streaming/loading fallback
const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;