"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CreateHackathonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function CreateHackathonDialog({ open, onOpenChange, onSuccess }: CreateHackathonDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    eligibility: "",
    rules: "",
    themes: [] as string[],
  })
  const [newTheme, setNewTheme] = useState("")

  const addTheme = () => {
    if (newTheme.trim() && !formData.themes.includes(newTheme.trim())) {
      setFormData((prev) => ({
        ...prev,
        themes: [...prev.themes, newTheme.trim()],
      }))
      setNewTheme("")
    }
  }

  const removeTheme = (theme: string) => {
    setFormData((prev) => ({
      ...prev,
      themes: prev.themes.filter((t) => t !== theme),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
        onOpenChange(false)
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          registrationDeadline: "",
          eligibility: "",
          rules: "",
          themes: [],
        })
      }
    } catch (error) {
      console.error("Failed to create hackathon:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Hackathon</DialogTitle>
          <DialogDescription>Fill in the details to create your hackathon event</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="AI Innovation Challenge"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your hackathon..."
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDeadline">Registration Deadline</Label>
              <Input
                id="registrationDeadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData((prev) => ({ ...prev, registrationDeadline: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Themes</Label>
            <div className="flex space-x-2">
              <Input
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                placeholder="Add a theme..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTheme())}
              />
              <Button type="button" onClick={addTheme}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.themes.map((theme) => (
                <Badge key={theme} variant="secondary" className="flex items-center gap-1">
                  {theme}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTheme(theme)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eligibility">Eligibility Criteria</Label>
            <Textarea
              id="eligibility"
              value={formData.eligibility}
              onChange={(e) => setFormData((prev) => ({ ...prev, eligibility: e.target.value }))}
              placeholder="Who can participate?"
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules">Rules & Guidelines</Label>
            <Textarea
              id="rules"
              value={formData.rules}
              onChange={(e) => setFormData((prev) => ({ ...prev, rules: e.target.value }))}
              placeholder="Competition rules and guidelines..."
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Hackathon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
