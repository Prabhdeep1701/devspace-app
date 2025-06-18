import { auth, currentUser } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

// In-memory storage for demo purposes
const hackathons: any[] = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Build the next generation of AI applications",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    registrationDeadline: "2024-01-25",
    themes: ["AI/ML", "Healthcare", "Education"],
    eligibility: "Open to all developers",
    rules: "Teams of 2-4 members, original code only",
    organizerId: "demo-organizer",
    participants: ["!"],
    teams: [],
    submissions: [],
  },
];

export async function GET() {
  return NextResponse.json(hackathons);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || user?.publicMetadata?.role !== "organizer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hackathonData = await request.json();

  const newHackathon = {
    id: Date.now().toString(),
    ...hackathonData,
    organizerId: userId,
    participants: [],
    teams: [],
    submissions: [],
  };

  hackathons.push(newHackathon);

  return NextResponse.json(newHackathon);
}
