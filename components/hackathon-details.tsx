"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, Clock, Trophy, ArrowLeft } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

interface HackathonDetailsProps {
  hackathonId: string
}

export default function HackathonDetails({ hackathonId }: HackathonDetailsProps) {
  const [hackathon, setHackathon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    fetchHackathon()
  }, [hackathonId])

  const fetchHackathon = async () => {
    try {
      const response = await fetch("/api/hackathons")
      const data = await response.json()
      const hackathon = data.find((h: any) => h.id === hackathonId)
      setHackathon(hackathon)
    } catch (error) {
      console.error("Failed to fetch hackathon:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setRegistering(true)
    try {
      const response = await fetch(`/api/hackathons/${hackathonId}/register`, {
        method: "POST",
      })

      if (response.ok) {
        // Refresh hackathon data
        fetchHackathon()
      }
    } catch (error) {
      console.error("Failed to register:", error)
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading hackathon details...</p>
        </div>
      </div>
    )
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hackathon Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The hackathon you're looking for doesn't exist.</p>
          <Link href="/hackathons">
            <Button>Browse Hackathons</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isActive = new Date(hackathon.endDate) > new Date()
  const canRegister = new Date(hackathon.registrationDeadline) > new Date()
  const userRole = user?.publicMetadata?.role

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/hackathons">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hackathons
                </Button>
              </Link>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{hackathon.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{hackathon.description}</p>
              </div>
              <Badge variant={isActive ? "default" : "secondary"} className="text-sm">
                {isActive ? "Active" : "Ended"}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {hackathon.themes?.map((theme: string) => (
                <Badge key={theme} variant="outline">
                  {theme}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {userRole !== "recruiter" && canRegister && (
                <Button onClick={handleRegister} disabled={registering}>
                  {registering ? "Registering..." : "Register for Hackathon"}
                </Button>
              )}
              <Link href="/teams">
                <Button variant="outline">Find Team</Button>
              </Link>
              {userRole === "recruiter" && <Button variant="outline">View Participants</Button>}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(hackathon.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">End Date</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(hackathon.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Registration Deadline</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(hackathon.registrationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Participants</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {hackathon.participants?.length || 0} registered
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{hackathon.eligibility}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rules & Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{hackathon.rules}</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Participants</span>
                    <span className="font-medium">{hackathon.participants?.length || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Teams</span>
                    <span className="font-medium">{hackathon.teams?.length || 0}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Submissions</span>
                    <span className="font-medium">{hackathon.submissions?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Themes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {hackathon.themes?.map((theme: string) => (
                      <div key={theme} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">{theme}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
