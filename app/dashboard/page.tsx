import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import RoleSelection from "@/components/role-selection"
import OrganizerDashboard from "@/components/organizer-dashboard"
import RecruiterDashboard from "@/components/recruiter-dashboard"

export default async function Dashboard() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const userRole = user?.publicMetadata?.role as string

  if (!userRole) {
    return <RoleSelection />
  }

  if (userRole === "organizer") {
    return <OrganizerDashboard />
  }

  if (userRole === "recruiter") {
    return <RecruiterDashboard />
  }

  return <RoleSelection />
}
