import { SignedIn, useUser } from '@clerk/clerk-react'
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
               <ScrollToTop />
            </SignedIn>
         </div>
      </>
   )
}