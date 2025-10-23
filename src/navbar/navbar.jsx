import { SignedIn, useUser } from '@clerk/clerk-react'
import './navbar.css'
import { MenuBottom, MenuSide } from './components/menu';
import { ScrollToTop } from './components/scroll-button/scroll-to-top';

export const Navbar = () => {

   const isSignedIn = useUser().isSignedIn;

   return (
      <>
         <div className={`navbar ${isSignedIn? "" : "hidden"}`}>
            <SignedIn>
               <MenuBottom />
               <MenuSide />
            </SignedIn>
         </div>
         <ScrollToTop />
      </>
   )
}