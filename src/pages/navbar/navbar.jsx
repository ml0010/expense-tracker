import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import './navbar.css'
import { Menu } from './components/menu';

export const Navbar = () => {

    const isSignedIn = useUser().isSignedIn;

    return (
        <div className={`navbar ${isSignedIn? "" : "hidden"}`}>
            <SignedIn>
                <Menu />
                <UserButton showName />
            </SignedIn>
        </div>
    )
}
