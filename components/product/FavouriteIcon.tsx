"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import toast from "react-hot-toast";

export const FavouriteIcon = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {

  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
      const availableProduct = favoriteProduct?.find((item) => (item._id === product?._id));
      setExistingProduct(availableProduct || null)
  },[product, favoriteProduct]);


 const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };

   /*
    - If showProduct is false → Show the Link version
    - If showProduct is true → Show the button that uses product to add/remove from favorites.
   */

  return (
    <> 
     {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-[#3b9c3c] hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-[#063d29] text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-[#3b9c3c] hoverEffect border border-[#3b9c3c]/80 hover:border-[#3b9c3c] p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-[#3b9c3c]/80 group-hover:text-[#3b9c3c] hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-[#3b9c3c]/80 group-hover:text-[#3b9c3c] hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  )
};
