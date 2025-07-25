import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navigate } from "react-router-dom";

const PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export const Authentication = () => {
  return (
    <div className="sign-in-container">
        <p>Sigin In</p>
        <SignedOut>
                <SignUpButton mode="modal" />
                <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
            <h2>Signed In</h2>
            <UserButton />
            <Navigate to="/dashboard" />
        </SignedIn>
    </div>
  )
}

export default Authentication;