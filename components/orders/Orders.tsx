"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { TableBody, TableCell, TableRow } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import PriceFormatter from "../product/PriceFormatter";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";
import toast from "react-hot-toast";

const Orders = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  // State to keep track of which order is selected for details
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  // Example handler for delete (only placeholder with toast)
  const handleDelete = () => {
    toast.error("Delete method applied for Admin");
  };

  return (
    <>
      {/* Table body that lists all orders */}
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            // Tooltip wrapper for each order row
            <Tooltip key={order?.orderNumber}>
              <TooltipTrigger asChild>
                {/* Clicking a row opens the dialog by setting selectedOrder */}
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Order number (last 10 chars only) */}
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>

                  {/* Order date formatted */}
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>

                  {/* Customer name */}
                  <TableCell>{order.customerName}</TableCell>

                  {/* Email (hidden on small screens) */}
                  <TableCell className="hidden sm:table-cell">
                    {order.email}
                  </TableCell>

                  {/* Total price formatted */}
                  <TableCell>
                    <PriceFormatter
                      amount={order?.totalPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>

                  {/* Status with colored badge */}
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.status.charAt(0).toUpperCase() +
                          order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>

                  {/* Invoice number (if available, hidden on small screens) */}
                  <TableCell className="hidden sm:table-cell">
                    {order?.invoice && (
                      <p className="font-medium line-clamp-1">
                        {order?.invoice ? order?.invoice?.number : "----"}
                      </p>
                    )}
                  </TableCell>

                  {/* Delete icon (X). Stop propagation so row click does not open dialog */}
                  <TableCell
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click event
                      handleDelete(); // Call delete handler
                    }}
                    className="flex items-center justify-center group"
                  >
                    <X
                      size={20}
                      className="group-hover:text-[#063c28] hoverEffect"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>

              {/* Tooltip content shown when hovering row */}
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>

      {/* Order detail dialog (controlled by selectedOrder state) */}
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder} // Open when an order is selected
        onClose={() => setSelectedOrder(null)} // Close dialog resets state
      />
    </>
  );
};

export default Orders;
