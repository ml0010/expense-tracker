import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import './navbar.css'

export const Navbar = () => {

    const isSignedIn = useUser().isSignedIn;

    return (
        <div className={`navbar ${isSignedIn? "" : "hidden"}`}>
            <SignedIn>
                <UserButton showName />
            </SignedIn>
        </div>
    )
}
