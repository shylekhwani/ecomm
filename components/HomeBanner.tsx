import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Title } from './ui/text';
import { banner_1 } from '@/images';

export const HomeBanner = () => {
  return (
    <>
     <div className="py-16 md:py-0 bg-[#fcf0e4] rounded-lg px-10 lg:px-24 flex items-center justify-between">
       <div className="space-y-5"> 
          <Title>
          Grab Upto 50% off on <br />
          Selected headphone
        </Title>
        <Link
          href={"/shop"}
          className="bg-[#063c28]/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-[#063c28] hoverEffect"
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-96"
        />
       </div>
     </div>
    </>
  )
};
