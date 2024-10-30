import slugify from "@sindresorhus/slugify";
import { db, eq, teamMembers, teams, users } from "@stratokit/db";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  // trustHost: true,
  events: {
    signIn: async (message) => {
      if (message.isNewUser) {
        const user = message.user;

        const teamName = `${user.name}'s Team`;
        const [team] = await db
          .insert(teams)
          .values({
            name: teamName,
            slug: slugify(teamName),
          })
          .returning({ insertedId: teams.id });

        if (!team) {
          throw new Error("Failed to create team");
        }

        await db.insert(teamMembers).values({
          teamId: team.insertedId,
          userId: user.id!,
          role: "owner",
        });
        await db
          .update(users)
          .set({ teamId: team.insertedId })
          .where(eq(users.id, user.id!));
      }
    },
  },
  ...authConfig,
});
