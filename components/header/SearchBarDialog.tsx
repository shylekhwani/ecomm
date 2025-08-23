"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import { GETAll_PRODUCTSResult } from "@/sanity.types";
import Image from "next/image";

interface SearchBarDialogProps {
  products: GETAll_PRODUCTSResult;
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBarDialog = ({ products, isOpen, onClose }: SearchBarDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GETAll_PRODUCTSResult>([]);

  const fuse = new Fuse(products, {
    keys: ["name", "variant"],
    threshold: 0.3,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const matches = fuse.search(value).map((res) => res.item);
    setResults(matches);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-5xl w-full max-h-[90vh] overflow-y-scroll 
                   rounded-2xl shadow-xl p-6 bg-amber-50 border border-gray-200"
      >
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            🔍 Search Products
          </DialogTitle>
        </DialogHeader>

        {/* Input */}
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type product name..."
          className="mt-4 border-gray-300 focus:ring-[#3b9c3c] focus:border-[#3b9c3c] 
                     px-4 py-3 text-lg rounded-xl bg-white shadow-sm"
        />

        {/* Results */}
        <div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
                     max-h-[65vh] overflow-y-auto pr-2
                     scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 
                           bg-white shadow-sm cursor-pointer hover:bg-gray-50 hover:shadow-md transition"
              >
                {/* Image */}
                {product.images && product.images[0]?.url && (
                  <div className="relative w-20 h-20 rounded-md overflow-hidden border">
                    <Image
                      src={product.images[0].url}
                      alt={product.name ?? "Product image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 text-lg line-clamp-1">
                    {product.name}
                  </p>
                  <span className="text-sm text-gray-500 capitalize">
                    {product.variant}
                  </span>
                </div>
              </div>
            ))
          ) : query ? (
            <p className="text-gray-500 text-center col-span-full mt-6">
              ❌ No results found.
            </p>
          ) : (
            <p className="text-gray-400 text-center col-span-full mt-6">
              ⌨️ Start typing to search...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
