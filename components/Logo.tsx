import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-2xl text-[#063c28] font-black tracking-wider uppercase hover:text-[#3b9c3c] hoverEffect group font-sans",
          className
        )}
      >
        Trendor
        <span
          className={cn(
            "text-[#3b9c3c] group-hover:text-[#063c28] hoverEffect",
            spanDesign
          )}
        >
          @
        </span>
      </h2>
    </Link>
  );
};
