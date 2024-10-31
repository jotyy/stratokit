import slugify from "@sindresorhus/slugify";
import { db, eq, teamMembers, teams, users } from "@stratokit/db";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      email: string;
      role: "owner" | "admin" | "member";
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

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

export const getUser = async () => {
  const session = await auth();
  return session?.user;
};
