"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, Trophy } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import CreateHackathonDialog from "./create-hackathon-dialog"
import Link from "next/link"

export default function OrganizerDashboard() {
  const [hackathons, setHackathons] = useState([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  useEffect(() => {
    fetchHackathons()
  }, [])

  const fetchHackathons = async () => {
    try {
      const response = await fetch("/api/hackathons")
      const data = await response.json()
      setHackathons(data)
    } catch (error) {
      console.error("Failed to fetch hackathons:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organizer Dashboard</h1>
              <Badge variant="secondary">Organizer</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/hackathons">
                <Button variant="ghost">Browse Hackathons</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hackathons</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hackathons.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hackathons.reduce((acc: number, h: any) => acc + (h.participants?.length || 0), 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hackathons.filter((h: any) => new Date(h.endDate) > new Date()).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Hackathons</h2>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Hackathon
          </Button>
        </div>

        {/* Hackathons List */}
        <div className="grid gap-6">
          {hackathons.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No hackathons yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Create your first hackathon to get started</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Hackathon
                </Button>
              </CardContent>
            </Card>
          ) : (
            hackathons.map((hackathon: any) => (
              <Card key={hackathon.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                      <CardDescription className="mt-2">{hackathon.description}</CardDescription>
                    </div>
                    <Badge variant={new Date(hackathon.endDate) > new Date() ? "default" : "secondary"}>
                      {new Date(hackathon.endDate) > new Date() ? "Active" : "Ended"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Start:</strong> {new Date(hackathon.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>End:</strong> {new Date(hackathon.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Participants:</strong> {hackathon.participants?.length || 0}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Teams:</strong> {hackathon.teams?.length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.themes?.map((theme: string) => (
                      <Badge key={theme} variant="outline">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/hackathons/${hackathon.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <CreateHackathonDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} onSuccess={fetchHackathons} />
    </div>
  )
}
