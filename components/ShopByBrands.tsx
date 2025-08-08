import { getAllBrands } from '@/sanity/queries';
import React from 'react'
import Title from './Title';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { Brand } from '@/sanity.types';

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

export const ShopByBrands = async () => {
    const brands = await getAllBrands();

  return (
    <>
    <div className="mb-10 lg:mb-20 bg-[#f6f6f6] p-5 lg:p-7 rounded-md">
         {/* Title and View All Link */}
        <div className="flex items-center gap-5 justify-between mb-10">
            <Title>Shop By Brands</Title>
            <Link 
                href={"/shop"}
                className='text-sm font-semibold tracking-wide hover:text-[#063c28] hoverEffect'
            >
               View All
            </Link>
        </div>

          {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {brands?.map((brand: Brand) => (
              <Link
               key={brand?._id}
               className='bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-[#063c28]/20 hoverEffect'
               href={`/brand/${brand?.slug?.current}`}
              >
               {brand?.image && (
                <Image
                  src={urlFor(brand.image).url()}
                  alt='brandImage'
                  width={250}
                  height={250}
                  className="w-32 h-20 object-contain"
                />
               )}
              </Link>
            ))}
        </div>

        {/* Extra Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-[#3b9c3c]/20 py-5">
         {extraData.map((item,index) => (
            <div
            key={index}
            className="flex items-center gap-3 group text-[#52525b] hover:text-[#3b9c3c]"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-[#151515]/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-[#52525b]">{item?.description}</p>
            </div>
          </div>
         ))} 
        </div>
    </div>
    </>
  );
};
