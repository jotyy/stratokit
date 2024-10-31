"use server";

import { authActionClient } from "@/actions/safe-action";
import { getUserWithTeam } from "@/lib/db/queries";
import { and, eq, invites } from "@stratokit/db";
import { db, teamMembers, users } from "@stratokit/db";
import { z } from "zod";

const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member"]),
});

export const inviteTeamMemberAction = authActionClient
  .schema(inviteTeamMemberSchema)
  .metadata({
    name: "invite-team-member",
  })
  .action(async ({ parsedInput: { email, role }, ctx }) => {
    const userWithTeam = await getUserWithTeam(ctx.user.id!);

    if (!userWithTeam?.teamId) {
      throw new Error("User is not in a team");
    }

    const [existingMember] = await db
      .select()
      .from(users)
      .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
      .where(
        and(
          eq(teamMembers.teamId, userWithTeam.teamId),
          eq(users.email, email),
        ),
      )
      .limit(1);

    if (existingMember) {
      throw new Error("User already in team");
    }

    const [existingInvite] = await db
      .select()
      .from(invites)
      .where(
        and(
          eq(invites.teamId, userWithTeam.teamId),
          eq(invites.email, email),
          eq(invites.status, "pending"),
        ),
      )
      .limit(1);

    if (existingInvite) {
      throw new Error("Invite already sent");
    }

    await db.insert(invites).values({
      teamId: userWithTeam.teamId,
      email,
      role,
      invitedBy: ctx.user.id,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
  });
