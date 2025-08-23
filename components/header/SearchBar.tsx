"use client";

import { GETAll_PRODUCTSResult } from "@/sanity.types";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchBarDialog } from "./SearchBarDialog";

interface SearchBarProps {
  products: GETAll_PRODUCTSResult;
};

const SearchBar = ({products}:SearchBarProps) => {
  // console.log("Products in SearchBar:", products);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <div>
      <Search className="w-5 h-5 hover:text-[#3b9c3c] hoverEffect cursor-pointer" onClick={()=>setOpenSearchBar(true)}/>
        <SearchBarDialog products={products} isOpen={openSearchBar} onClose={()=>setOpenSearchBar(false)}/>
    </div>
  );
};

export default SearchBar;