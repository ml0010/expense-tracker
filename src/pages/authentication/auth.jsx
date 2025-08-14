import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navigate } from "react-router-dom";
import "./auth.css";

const PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export const Authentication = () => {
    return (
        <div className="sign-in-container">
            <h1>Expense Tracker</h1>
            <div>
                <SignedOut>
                        <h2></h2>
                        <SignUpButton className="button" mode="modal" />
                        <SignInButton className="button" mode="modal" />
                </SignedOut>
                <SignedIn>
                    <h2>Signed In</h2>
                    <UserButton />
                    <Navigate to="/dashboard" />
                </SignedIn>
            </div>
        </div>
    )
}

export default Authentication;