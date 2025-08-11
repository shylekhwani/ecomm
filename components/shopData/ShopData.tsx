"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { BRANDS_QUERYResult, Category, Product } from '@/sanity.types';
import React from 'react'
import { useState, useEffect } from 'react';
import Container from "../Container";
import Title from "../Title";
import { useSearchParams } from "next/navigation";
import CategoryList from './CategoryList';
import BrandList from './BrandList';
import PriceList from './PriceList';
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import {NoProductAvailable} from "../NoProductAvailable";
import {ProductCard} from "../ProductCard";

interface ShopDataProps {
    categories: Category[];
    brands: BRANDS_QUERYResult;
};

export const ShopData = ({categories, brands}:ShopDataProps) => {

  // ✅ Read query parameters from the URL (server doesn't run this)
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  // console.log("searchParams",searchParams, brandParams, categoryParams);

  // ✅ Local state for products and filters
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // ✅ Function to fetch products from Sanity based on filters
   const fetchProducts = async () => {
    setLoading(true);
    try {
      // ✅ Price filter default range
      let minPrice = 0;
      let maxPrice = 10000;

      
      // ✅ If user picked a price range like "100-300", split into numbers
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number); // [100, 300]
        minPrice = min; //  gets the first number (100)
        maxPrice = max; //  gets the second number (300)
      }
      
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div className="border-t">
      <Container className="mt-5">

        {/* Top section: Title + Reset filters */}
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your needs
            </Title>
             {/*if any condition is true we show reset button*/}
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-[#063c28] underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Main layout: sidebar + product grid */}
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-[#063c28]/50">

          {/* Sidebar: Filters */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-[#063c28]/50 scrollbar-hide">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceList
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>

          {/* Product list */}
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                // Loading state
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-[#063c28] animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                // Product grid
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                // No products message
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};