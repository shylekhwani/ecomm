"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from 'react'

export const CartIcon = () => {
  return (
    <>
      <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-[#3b9c3c] hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-[#063c28] text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {/* {items?.length ? items?.length : 0} */ 0}
      </span>
    </Link>
    </>
  )
}
