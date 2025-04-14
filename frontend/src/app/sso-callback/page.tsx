// app/sso-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();

  useEffect(() => {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    // Try to handle the callback for sign-in
    async function handleSignInCallback() {
      try {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_callback",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      } catch (error) {
        console.error("Error during sign in callback:", error);
      }
    }

    // Try to handle the callback for sign-up
    async function handleSignUpCallback() {
      try {
        await signUp.authenticateWithRedirect({
          strategy: "oauth_callback",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      } catch (error) {
        console.error("Error during sign up callback:", error);
      }
    }

    // Try both since we don't know which flow the user is in
    handleSignInCallback().catch(() => handleSignUpCallback());
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Processing authentication...</p>
    </div>
  );
}