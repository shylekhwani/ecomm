/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from 'react'
import { useState } from 'react';
import { HomeTabBar } from './HomeTabBar';
import { productType } from '@/constants/data';
import Container from './Container';
import { client } from '@/sanity/lib/client';

export const ProductGrid = () => {

    const [products, setProducts] = useState([]);
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