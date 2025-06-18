"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Search, ArrowLeft, Copy } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function TeamManagement() {
  const [teams, setTeams] = useState([
    {
      id: "1",
      name: "AI Innovators",
      hackathon: "AI Innovation Challenge",
      members: ["John Doe", "Jane Smith"],
      inviteCode: "AI2024",
      maxMembers: 4,
    },
  ])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [joinCode, setJoinCode] = useState("")

  const createTeam = () => {
    if (newTeamName.trim()) {
      const newTeam = {
        id: Date.now().toString(),
        name: newTeamName,
        hackathon: "AI Innovation Challenge",
        members: ["You"],
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        maxMembers: 4,
      }
      setTeams([...teams, newTeam])
      setNewTeamName("")
      setShowCreateDialog(false)
    }
  }

  const joinTeam = () => {
    // Simulate joining a team
    setJoinCode("")
    setShowJoinDialog(false)
  }

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Teams</h2>
          <div className="space-x-2">
            <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Join Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join a Team</DialogTitle>
                  <DialogDescription>Enter the invite code to join an existing team</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="joinCode">Invite Code</Label>
                    <Input
                      id="joinCode"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      placeholder="Enter invite code"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={joinTeam}>Join Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                  <DialogDescription>Create a team for your hackathon participation</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Enter team name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createTeam}>Create Team</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6">
          {teams.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No teams yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Create a team or join an existing one to get started
                </p>
                <div className="space-x-2">
                  <Button onClick={() => setShowCreateDialog(true)}>Create Team</Button>
                  <Button variant="outline" onClick={() => setShowJoinDialog(true)}>
                    Join Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <CardDescription>Hackathon: {team.hackathon}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {team.members.length}/{team.maxMembers} members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Team Members</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member, index) => (
                          <Badge key={index} variant="secondary">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Invite Code</p>
                        <p className="text-lg font-mono">{team.inviteCode}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => copyInviteCode(team.inviteCode)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">Manage Team</Button>
                      <Button size="sm" variant="outline">
                        View Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
