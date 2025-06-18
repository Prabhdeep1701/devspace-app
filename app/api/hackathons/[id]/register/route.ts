import { auth, currentUser } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // This would typically interact with a database
  // For demo purposes, we'll simulate registration

  return NextResponse.json({
    success: true,
    message: "Successfully registered for hackathon",
  })
}
