import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Users, Trophy, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">DevSpace</span>
          </div>
          <div className="space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          The Future of <span className="text-blue-600">Hackathons</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Connect with innovators, compete in cutting-edge challenges, and showcase your skills to top recruiters.
          DevSpace is where talent meets opportunity.
        </p>
        <div className="space-x-4">
          <Link href="/sign-up">
            <Button size="lg" className="px-8 py-3">
              Join as Participant
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="lg" variant="outline" className="px-8 py-3">
              I'm a Recruiter
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose DevSpace?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Team Formation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find teammates with complementary skills and form winning teams effortlessly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Compete & Win</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Participate in exciting hackathons and showcase your innovative solutions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Get Discovered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Top recruiters browse projects and connect with talented developers.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Build Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Create an impressive portfolio of hackathon projects and achievements.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of developers and recruiters already using DevSpace</p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
