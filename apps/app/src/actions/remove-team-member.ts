"use server";

import { authActionClient } from "@/actions/safe-action";
import { getUserWithTeam } from "@/lib/db/queries";
import { and, db, eq, teamMembers } from "@stratokit/db";
import { z } from "zod";

const removeTeamMemberSchema = z.object({
  memberId: z.string(),
});

export const removeTeamMemberAction = authActionClient
  .schema(removeTeamMemberSchema)
  .metadata({
    name: "remove-team-member",
  })
  .action(async ({ ctx, parsedInput: { memberId } }) => {
    const userWithTeam = await getUserWithTeam(ctx.user.id!);

    if (!userWithTeam?.teamId) {
      throw new Error("User is not in a team");
    }

    await db
      .delete(teamMembers)
      .where(
        and(
          eq(teamMembers.teamId, userWithTeam.teamId),
          eq(teamMembers.userId, memberId),
        ),
      );

    return { success: "Team member removed successfully" };
  });
