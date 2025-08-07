import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import React from 'react'

export const ProductCard = ({product}:{product:Product}) => {
  return (
     <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
            <Image
              src={urlFor(product?.images[0]).url()} // This is a helper function provided by Sanity that converts the image reference to a full URL.
              alt='Product Image'
              loading="lazy"
              width={700}
              height={700}
            />
        )}
      </div>
    </div>
  )
};
