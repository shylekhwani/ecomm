import React from 'react'
import Container from './Container'
import { Logo } from './Logo'
import { HeaderMenu } from './HeaderMenu'
import SearchBar from './SearchBar'
import { CartIcon } from './CartIcon'
import { FavouriteIcon } from './FavouriteIcon'
import { SignIn } from './SignIn'
import { MobileMenu } from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'

export const Header = async () => {

    const user = await currentUser();
    console.log("User Info:", user);

  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
        <Container className="flex items-center justify-between text-[#52525b]">
            <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
              <MobileMenu/>
              <Logo/>
            </div>
            <HeaderMenu/>
            <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                <SearchBar/>
                <CartIcon/>
                <FavouriteIcon/>
                <ClerkLoaded>
                  <SignedIn>
                  <UserButton/>
                  </SignedIn>
                  {!user && <SignIn/>}
                </ClerkLoaded>
            </div>
             
        </Container>
    </header>
  )
};
