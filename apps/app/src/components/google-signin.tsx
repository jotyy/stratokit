"use client";

import { Button } from "@stratokit/ui/button";
import { signIn } from "next-auth/react";

export function GoogleSignin() {
  const handleSignin = () => {
    signIn("google");
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="font-mono">
      Sign in with Google
    </Button>
  );
}
