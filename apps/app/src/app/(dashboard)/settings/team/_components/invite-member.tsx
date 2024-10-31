"use client";

import { inviteTeamMemberAction } from "@/actions/invite-team-member";
import { Button } from "@stratokit/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stratokit/ui/card";
import { Input } from "@stratokit/ui/input";
import { Label } from "@stratokit/ui/label";
import { RadioGroup, RadioGroupItem } from "@stratokit/ui/radio-group";
import { Loader2, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function InviteTeamMember() {
  const { data: session } = useSession();
  const isOwner = session?.user?.role === "owner";
  const { execute, isExecuting } = useAction(inviteTeamMemberAction, {
    onSuccess: () => {
      toast.success("Invite sent successfully");
    },
    onError: (error) => {
      toast.error("Failed to send invite", {
        description: error.error?.serverError,
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            execute({
              email: formData.get("email") as string,
              role: formData.get("role") as "admin" | "member",
            });
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
            />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">Member</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner">Owner</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={isExecuting || !isOwner}>
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            You must be a team owner to invite new members.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
