import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import HackathonDetails from "@/components/hackathon-details"

export default async function HackathonPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <HackathonDetails hackathonId={params.id} />
}
