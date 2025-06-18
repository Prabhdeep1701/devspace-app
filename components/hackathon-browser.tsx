"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Users, ArrowLeft } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function HackathonBrowser() {
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
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Hackathons</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
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

        {/* Hackathons Grid */}
        <div className="grid gap-6">
          {filteredHackathons.map((hackathon: any) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {hackathon.participants?.length || 0} participants
                    </span>
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
                    <Button>View Details</Button>
                  </Link>
                  {new Date(hackathon.registrationDeadline) > new Date() && <Button variant="outline">Register</Button>}
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
  )
}
