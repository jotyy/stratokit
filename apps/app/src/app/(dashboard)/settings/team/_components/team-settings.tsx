"use client";

import { removeTeamMemberAction } from "@/actions/remove-team-member";
import { InviteTeamMember } from "@/app/(dashboard)/settings/team/_components/invite-member";
import { customerPortalAction } from "@/lib/payments/actions";
import type { TeamDataWithMembers, User } from "@stratokit/db";
import { Avatar, AvatarFallback, AvatarImage } from "@stratokit/ui/avatar";
import { Button } from "@stratokit/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@stratokit/ui/card";
import { useAction } from "next-safe-action/hooks";

export function TeamSettings({ teamData }: { teamData: TeamDataWithMembers }) {
  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User";
  };

  const { execute, isExecuting } = useAction(removeTeamMemberAction);

  return (
    <section className="container mx-autoflex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Team Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {teamData.planName || "Free"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {teamData.subscriptionStatus === "active"
                    ? "Billed monthly"
                    : teamData.subscriptionStatus === "trialing"
                      ? "Trial period"
                      : "No active subscription"}
                </p>
              </div>
              <form
                action={async () => {
                  await customerPortalAction();
                }}
              >
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={getUserDisplayName(member.user)}
                    />
                    <AvatarFallback>
                      {getUserDisplayName(member.user)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {getUserDisplayName(member.user)}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {member.role}
                    </p>
                  </div>
                </div>
                {index > 1 ? (
                  <form action={() => execute({ memberId: member.id })}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={isExecuting}
                    >
                      {isExecuting ? "Removing..." : "Remove"}
                    </Button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <InviteTeamMember />
    </section>
  );
}
