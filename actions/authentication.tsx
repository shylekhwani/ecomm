"use server"

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route"
import useStore from "@/store"

export async function SignInAction() {
  await signIn("google", { redirectTo: "/" })
}

export async function SignOutAction() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {resetCart, resetFavorite} = useStore();
  await signOut({ redirectTo: "/" })
  resetCart();
  resetFavorite();
}
