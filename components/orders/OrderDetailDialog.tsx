import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "../product/PriceFormatter";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {

  if (!order) return null;

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-scroll rounded-2xl shadow-xl p-6 bg-amber-50">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-xl font-semibold">
            Order Details -{" "}
            <span className="text-primary">{order?.orderNumber}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Customer Info */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong className="font-medium text-gray-900">Customer:</strong>{" "}
            {order.customerName}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Email:</strong>{" "}
            {order.email}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Date:</strong>{" "}
            {order.orderDate &&
              new Date(order.orderDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </p>
          <p>
            <strong className="font-medium text-gray-900">Status:</strong>{" "}
            <span
              className={`capitalize font-semibold px-2 py-0.5 rounded ${
                order.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </p>
          {order?.invoice?.number && (
            <p>
              <strong className="font-medium text-gray-900">
                Invoice Number:
              </strong>{" "}
              {order?.invoice?.number}
            </p>
          )}
        </div>

        {/* Invoice Button */}
        {order?.invoice?.hosted_invoice_url && (
          <div className="mt-3">
            <Button
              variant="outline"
              className="hover:bg-primary hover:bg-[#9393a0] transition"
            >
              <Link href={order.invoice.hosted_invoice_url} target="_blank">
                Download Invoice
              </Link>
            </Button>
          </div>
        )}

        {/* Products Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-3">
                    {product?.product?.images && (
                      <Image
                        src={urlFor(product?.product?.images[0]).url()}
                        alt="productImage"
                        width={50}
                        height={50}
                        className="border rounded-md"
                      />
                    )}
                    <span className="font-medium text-gray-900">
                      {product?.product?.name}
                    </span>
                  </TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price}
                      className="text-gray-800 font-medium"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-64 border rounded-lg p-4 bg-gray-50 space-y-2 text-sm">
            {order?.amountDiscount !== 0 && (
              <>
                <div className="flex justify-between">
                  <span className="font-medium">Discount:</span>
                  <PriceFormatter
                    amount={order?.amountDiscount}
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <PriceFormatter
                    amount={
                      (order?.totalPrice as number) +
                      (order?.amountDiscount as number)
                    }
                    className="text-gray-800 font-semibold"
                  />
                </div>
              </>
            )}
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold text-lg">Total:</span>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-bold text-lg"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;