import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import './navbar.css'
import { Menu } from '../menu';
import { ScrollToTop } from '../scroll-button/scroll-to-top';

export const Navbar = () => {

    const isSignedIn = useUser().isSignedIn;

    return (
        <>
            <div className={`navbar ${isSignedIn? "" : "hidden"}`}>
                <SignedIn>
                    <Menu />
                    <div className="user-button">
                        <UserButton showName />
                    </div>
                </SignedIn>
            </div>
            <ScrollToTop />
        </>
    )
}
