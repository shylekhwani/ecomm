"use client";
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { useEffect } from "react";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
    
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  console.log("AddToCartButton", product, itemCount);

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className="w-full h-12 flex items-center">

      {/* Display quantity buttons if item count is greater than 0 */}
      {itemCount ? ( 
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#151515]/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>

      ) : (
        // If item count is 0, show the Add to Cart button
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-[#063c28]/80 text-lightBg shadow-none border border-[#063c28]/80 font-semibold tracking-wide text-white hover:bg-[#063c28] hover:border-[#063c28] hoverEffect",
            className
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;