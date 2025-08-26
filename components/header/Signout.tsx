"use client";

import React from "react";
import useStore from "@/store";
import Image from "next/image";
import { Session } from "next-auth";

interface UserProps {
  user: Session;
}

export const Signout = ({ user }: UserProps) => {
  const { resetCart, resetFavorite } = useStore();

  const handleLogout = () => {
    resetCart();
    resetFavorite();
  };

  return (
    <button
      type="submit" 
      onClick={handleLogout} // clears cart/favorites
      className="rounded-md text-white"
    >
      <Image
        src={user.user?.image || "/images/emptyCart.png"}
        alt="userImage"
        width={32}
        height={32}
        className="rounded-full"
      />
    </button>
  );
};
