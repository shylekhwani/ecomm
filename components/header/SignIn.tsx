"use client";
import { SignInButton } from "@clerk/nextjs";
import React from 'react'

export const SignIn = () => {
  return (
     <SignInButton mode="modal">
      <button className="text-sm font-semibold hover:text-[#151515] text-[#52525b] hover:cursor-pointer hoverEffect">
        Login
      </button>
    </SignInButton> 
  )
};
