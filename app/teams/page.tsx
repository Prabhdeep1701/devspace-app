import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TeamManagement from "@/components/team-management"

export default async function TeamsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <TeamManagement />
}
