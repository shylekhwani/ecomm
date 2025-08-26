import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import { auth } from "@/lib/auth";
import React from "react";

const WishListPage = async () => {

  const session = await auth();
  const user = session?.user;

  // console.log("SessionAuth", session);

  return (
    <>
      {user ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;