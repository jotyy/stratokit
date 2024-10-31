import { auth } from "@/lib/auth";
import { getTeamForUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { TeamSettings } from "./_components/team-settings";

export const runtime = "edge";

export const metadata = {
  title: "Team | StratoKit",
  description: "Manage your StratoKit team",
};

export default async function TeamPage() {
  const session = await auth();
  console.log(session);

  if (!session?.user) {
    redirect("/login");
  }

  const teamData = await getTeamForUser(session.user.id);

  if (!teamData) {
    throw new Error("Team not found");
  }

  return <TeamSettings teamData={teamData} />;
}
