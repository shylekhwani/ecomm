import React from 'react'
import { getAllBrands, getCategories } from "@/sanity/queries";
import { ShopData } from '@/components/shopData/ShopData';

export default async function Shopage() {

  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-white">
      <ShopData categories={categories} brands={brands} />
    </div>
  );
};