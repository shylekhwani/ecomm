import Container from '../Container'
import { Logo } from './Logo'
import { HeaderMenu } from './HeaderMenu'
import SearchBar from './SearchBar'
import { CartIcon } from './CartIcon'
import { FavouriteIcon } from '../product/FavouriteIcon'
import { MobileMenu } from '../mobile/MobileMenu'
import { getAllProducts, getMyOrders } from "@/sanity/queries"
import Link from 'next/link'
import { Logs } from 'lucide-react'
import { auth } from '@/lib/auth'
import { SignOutAction, SignInAction } from '@/actions/authentication'
import { SignIn } from './SignIn'
import { Signout } from './Signout'

export const Header = async () => {

   const products = await getAllProducts();
    // console.log("Products in Header:", products);

   const session = await auth();
   const user = session?.user;
   const userId = session?.user?.id;
  //  console.log("user", user)

    let orders = null;

    if (userId) {
      orders = await getMyOrders(userId);
    };
  
  return (
    <header className="sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md">
        <Container className="flex items-center justify-between text-[#52525b]">

            <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
              <MobileMenu/>
              <Logo/>
            </div>

            <HeaderMenu/>
            
            {/* Search bar, cart icon, and user account section */}
            <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                <SearchBar products={products}/>
                <CartIcon/>
                <FavouriteIcon/>

                  {user && (
                    <Link
                      href={"/orders"}
                      className="group relative hover:text-[#3b9c3c] hoverEffect"
                    >
                      <Logs />
                      <span className="absolute -top-1 -right-1 bg-[#063d29] text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                        {orders?.length ? orders?.length : 0}
                      </span>
                    </Link>
                  )}

                  {user ? (
                  <form action={SignOutAction}>
                    <Signout user={session}/>
                  </form>
                ) : (
                  <form action={SignInAction}>
                      <SignIn/>
                  </form>
                )}
             </div>
        </Container>
    </header>
  )
};
