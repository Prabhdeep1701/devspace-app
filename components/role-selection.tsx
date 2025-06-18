"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function RoleSelection() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const selectRole = async (role: "organizer" | "recruiter") => {
    setLoading(true)

    try {
      const response = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })

      if (response.ok) {
        // Reload to update user metadata
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to set role:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to DevSpace, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Choose your role to get started with the platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Organizer</CardTitle>
              <CardDescription className="text-base">
                Host and manage hackathons, create challenges, and build communities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Create and manage hackathons</li>
                <li>• Set themes, rules, and eligibility</li>
                <li>• Monitor participant progress</li>
                <li>• Evaluate submissions</li>
              </ul>
              <Button className="w-full" onClick={() => selectRole("organizer")} disabled={loading}>
                Continue as Organizer
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Building2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Recruiter</CardTitle>
              <CardDescription className="text-base">
                Discover talent, browse projects, and connect with developers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Browse hackathon participants</li>
                <li>• View project submissions</li>
                <li>• Evaluate team profiles</li>
                <li>• Connect with talent</li>
              </ul>
              <Button className="w-full" variant="secondary" onClick={() => selectRole("recruiter")} disabled={loading}>
                Continue as Recruiter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
