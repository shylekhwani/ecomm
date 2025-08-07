/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from 'react'
import { useState } from 'react';
import { HomeTabBar } from './HomeTabBar';
import { productType } from '@/constants/data';
import Container from './Container';
import { client } from '@/sanity/lib/client';
import { motion } from 'motion/react';
import { NoProductAvailable } from './NoProductAvailable';
import { AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '@/sanity.types'; // comes from typegen command

//  type Product = {
//         _id: string;
//         name: string;
//         [key: string]: any;
//     };

export const ProductGrid = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

    const params = {variant: selectedTab.toLocaleLowerCase()};

    const query = `*[_type == "product" && variant == $variant] | order(name desc) {
    ..., "categories":categories[]->title
    }`;

    useEffect(() => {
        const fetchdata = async function() {
            setLoading(true);
            try {
                const response = await client.fetch(query,params);
                setProducts(response);
                console.log("response", response);
            } catch (error) {
                console.error("Error fetching products:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchdata();
    }, [selectedTab]);

    /*
     client.fetch(query, params) →
       --> client → Your Sanity client created using @sanity/client.
       --> .fetch() → Executes the GROQ query with params.
    */

  return (
    <>
    <Container className="flex flex-col lg:px-0 my-10">
        <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

       {loading ? (

        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </motion.div>
        </div>
       
        ) : products?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
                {products?.map((product) => (
                <AnimatePresence key={product?._id}>
                    <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    >

                    <ProductCard key={product?._id} product={product} />

                    </motion.div>
                </AnimatePresence>
                ))}
            </div>
        ) : (
            <NoProductAvailable selectedTab={selectedTab}/>
        )
       }
    </Container>
    </>
  )
};

/*

Let’s dissect this GROQ query:
-- * → Fetch all documents in Sanity.

-- [_type == "product" && variant == $variant] → Filter

-- _type == "product" → Only product documents.

-- variant == $variant → Only products where the field variant matches the param passed (like "shoes").

-- $variant → Dynamic variable from params.

-- | order(name desc) → Sort results by name in descending order.

-- { ... } → Projection (what fields to return)

-- ... → Spread all fields in the product document.

-- "categories": categories[]->title →

-- categories[] → This is an array of references to the category documents.

-- ->title → Fetch the title field from the referenced category.

-- "categories" → Rename the returned array to categories.

*/