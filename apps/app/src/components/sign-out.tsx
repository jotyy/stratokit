"use client";

import { Button } from "@stratokit/ui/button";
import { Icons } from "@stratokit/ui/icons";
import { signOut } from "next-auth/react";

export function SignOut() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <Icons.SignOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
