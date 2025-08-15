"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);

  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

   // Function to load more products (increases visible count)
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavorite(); // Clear favorites in the store
      toast.success("Wishlist reset successfully");
    }
  };

  return (
     <Container>
      {favoriteProduct?.length > 0 ? ( // ✅ If there are products in wishlist
        <>
          {/* Table view of wishlist */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table headers */}
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left hidden md:table-cell">Category</th>
                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left hidden md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {favoriteProduct
                  ?.slice(0, visibleProducts) // Show only a limited number of products
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      {/* First column: remove icon, image, and product name */}
                      <td className="px-2 py-4 flex items-center gap-2">
                        {/* Remove product from wishlist */}
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />

                        {/* Product image link */}
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group hidden md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={"product image"}
                              width={80}
                              height={80}
                              className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                            />
                          </Link>
                        )}

                        {/* Product name */}
                        <p className="line-clamp-1">{product?.name}</p>
                      </td>

                      {/* Product category */}
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <p className="uppercase line-clamp-1 text-xs font-medium">
                            {product.categories.map((cat) => cat).join(", ")}
                          </p>
                        )}
                      </td>

                      {/* Product type */}
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant}
                      </td>

                      {/* Stock status */}
                      <td
                        className={`p-2 w-24 ${
                          (product?.stock as number) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium text-sm hidden md:table-cell`}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>

                      {/* Product price */}
                      <td className="p-2">
                        <PriceFormatter amount={product?.price} />
                      </td>

                      {/* Add to cart button */}
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            {visibleProducts < favoriteProduct?.length && (
              <div className="my-5">
                <Button onClick={loadMore} className="text-white bg-[#063c28] hover:bg-[#051f1a]">
                  Load More
                </Button>
              </div>
            )}
            {visibleProducts > 10 && (
              <div className="my-5">
                <Button
                  className="text-white bg-[#063c28] hover:bg-[#051f1a]"
                  onClick={() => setVisibleProducts(10)}
                >
                  Load Less
                </Button>
              </div>
            )}
          </div>

          {/* Reset wishlist button */}
          {favoriteProduct?.length > 0 && (
            <Button
              onClick={handleResetWishlist}
              className="mb-5 font-semibold text-white bg-red-600 hover:bg-red-700"
              size="lg"
            >
              Reset Wishlist
            </Button>
          )}
        </>
      ) : (
        // ❌ If wishlist is empty → show empty state
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            {/* Ping animation circle */}
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            {/* Heart icon */}
            <Heart
               className="h-12 w-12 text-red-500" // Outline color
               strokeWidth={1.5}
               fill="red" // Fill color
            />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Items added to your wishlist will appear here
            </p>
          </div>

          {/* Continue shopping button */}
          <Button asChild className="text-white bg-[#063c28] hover:bg-[#051f1a]">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;