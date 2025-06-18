"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, Eye, Star } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function RecruiterDashboard() {
  const [hackathons, setHackathons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredHackathons = hackathons.filter(
    (hackathon: any) =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Recruiter
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/teams">
                <Button variant="ghost">Browse Teams</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hackathons</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hackathons.filter((h: any) => new Date(h.endDate) > new Date()).length}
              </div>
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
              <CardTitle className="text-sm font-medium">Projects Reviewed</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Hackathons */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Hackathons</h2>

          <div className="grid gap-6">
            {filteredHackathons.map((hackathon: any) => (
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
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Duration:</strong> {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                        {new Date(hackathon.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Participants:</strong> {hackathon.participants?.length || 0}
                      </p>
                    </div>
                    <div>
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
                      <Button size="sm">View Participants</Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      View Projects
                    </Button>
                    <Button variant="outline" size="sm">
                      Shortlist Talent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHackathons.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No hackathons found</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search terms or check back later for new events
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
