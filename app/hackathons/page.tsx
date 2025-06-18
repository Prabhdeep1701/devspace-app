import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import HackathonBrowser from "@/components/hackathon-browser"

export default async function HackathonsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <HackathonBrowser />
}
