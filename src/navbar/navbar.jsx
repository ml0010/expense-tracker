import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import './navbar.css'
import { Menu } from './components/menu';
import { ScrollToTop } from './components/scroll-button/scroll-to-top';

export const Navbar = () => {

   const isSignedIn = useUser().isSignedIn;

   return (
      <>
         <div className={`navbar ${isSignedIn? "" : "hidden"}`}>
            <SignedIn>
               <Menu />
            </SignedIn>
         </div>
         <ScrollToTop />
      </>
   )
}
/*
               <div className="user-button">
                  <UserButton showName />
               </div>
               
               */
