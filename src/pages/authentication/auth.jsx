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
            <div class="header">
                <div class="inner-header">
                    <h1>Expense Tracker</h1>
                    <div>
                        <SignedOut>
                            <div className="buttons">
                                <SignUpButton className="button" mode="modal" />
                                <SignInButton className="button" mode="modal" />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <h2>Signed In</h2>
                            <UserButton />
                            <Navigate to="/dashboard" />
                        </SignedIn>
                    </div>
                </div>
                <div>
                    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g class="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--color-background)" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Authentication;

/*
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
*/