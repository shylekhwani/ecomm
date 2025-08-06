import React from 'react'
import { productType } from '@/constants/data';
import Link from 'next/link';

interface HomeTabBarProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

export const HomeTabBar = ({selectedTab, setSelectedTab}: HomeTabBarProps) => {
console.log("selectedTab", selectedTab);
  return (
    <>
     <div className="flex items-center flex-wrap gap-5 justify-between"> 
        <div className="flex items-center gap-1.5 text-sm font-semibold">
            <div className="flex items-center gap-1.5 md:gap-3">
              {productType.map((item)=>(
                <button key={item.title}
                 onClick={() => setSelectedTab(item.title)}
                 className={`border border-[#3b9c3c]/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-[#3b9c3c] hover:border-[#3b9c3c] hover:text-white hoverEffect ${selectedTab === item?.title ? "bg-[#3b9c3c] text-white border-[#3b9c3c]" : "bg-[#3b9c3c]/10"}`}
                 >
                    {item.title}
                </button>
              ))}
            </div>
        </div>
        <Link href={"/shop"} className="border border-[#151515] px-4 py-1 rounded-full hover:bg-[#3b9c3c] hover:text-white hover:border-[#3b9c3c] hoverEffect">
              See all
        </Link>
      </div>
    </>
  )
};
