"use client";
import React from 'react'
import { headerData } from '@/constants/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const HeaderMenu = () => {

  const pathname = usePathname();

  return (
    <> 
      <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-7 text-sm capitalize font-semibold text-[#52525b]">
        {headerData?.map((item) => (
          <Link 
          key={item?.title} 
          href={item?.href} 
            className={`hover:text-[#3b9c3c] hoverEffect relative group ${
            pathname === item?.href && "text-[#3b9c3c]"
          }`}
          >
            {item?.title}
            <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-[#3b9c3c] group-hover:w-1/2 hoverEffect group-hover:left-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-[#3b9c3c] group-hover:w-1/2 hoverEffect group-hover:right-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
          </Link>
        ))}
      </div>
    </>
  )
};
