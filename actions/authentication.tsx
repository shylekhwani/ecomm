"use server"

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route"

export async function SignInAction() {
  await signIn("google", { redirectTo: "/" })
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" })
}
