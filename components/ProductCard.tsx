import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react'
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import Title from "./Title";
import PriceView from './PriceView';

export const ProductCard = ({product}:{product:Product}) => {
  return (
     <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-[#f6f6f6]">
        {product?.images && (
            <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()} // This is a helper function provided by Sanity that converts the image reference to a full URL.
              alt='Product Image'
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-[#f6f6f6] duration-500 
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
            </Link>
        )}
          {/* <ProductSideMenu product={product} /> */}
          {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-[#151515]/50 px-2 rounded-full group-hover:border-lightGreen hover:text-[#063c28] hoverEffect">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-[#fb6c08]/50 p-1 rounded-full group-hover:border-[#fb6c08] hover:text-[#063c28] hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
         {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
         <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-[#3b9c3c]" : " text-lightText"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-[#063c28]/80 font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        {/* <AddToCartButton product={product} className="w-36 rounded-full" /> */}
      </div>
    </div>
  )
};
