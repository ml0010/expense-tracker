import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navigate } from "react-router-dom";

const PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export const Authentication = () => {
  return (
    <div>
        <p>Authentication</p>
        <SignedOut>
                <SignUpButton mode="modal" />
                <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
            <p>Signed In</p>
            <UserButton />
            <Navigate to="/dashboard" />
        </SignedIn>
    </div>
  )
}

export default Authentication;