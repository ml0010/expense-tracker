import { SignedIn, useUser } from '@clerk/clerk-react'
import './navbar.css'
import { Menu, MenuBottom, MenuSide } from './components/menu';
import { ScrollToTop } from './components/scroll-button/scroll-to-top';
import { TransactionForm } from '../pages/components/transaction-form/transaction-form';

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