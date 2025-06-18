import { auth, clerkClient } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { role } = await request.json()

  if (!["organizer", "recruiter"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}
