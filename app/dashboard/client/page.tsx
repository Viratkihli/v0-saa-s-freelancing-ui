import { StatCard } from "@/components/dashboard/stat-card"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, DollarSign, Clock, Plus, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  { title: "Active Projects", value: "8", change: { value: "+2", trend: "up" as const }, icon: Briefcase, iconColor: "bg-primary/10 text-primary" },
  { title: "Hired Freelancers", value: "12", change: { value: "+3", trend: "up" as const }, icon: Users, iconColor: "bg-accent/10 text-accent" },
  { title: "Total Spent", value: "$24,500", change: { value: "+18%", trend: "up" as const }, icon: DollarSign, iconColor: "bg-success/10 text-success" },
  { title: "Avg. Response", value: "2.4h", change: { value: "-12%", trend: "down" as const }, icon: Clock, iconColor: "bg-warning/10 text-warning" },
]

const projects = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX",
    status: "active" as const,
    budget: "$12,000",
    deadline: "Apr 15, 2026",
    progress: 65,
    freelancer: { name: "Sarah Chen" },
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Native iOS and Android app for the e-commerce platform",
    status: "active" as const,
    budget: "$18,000",
    deadline: "May 30, 2026",
    progress: 35,
    freelancer: { name: "Marcus Johnson" },
  },
  {
    id: "3",
    title: "Brand Identity Package",
    description: "Logo, color scheme, typography, and brand guidelines",
    status: "pending" as const,
    budget: "$3,500",
    deadline: "Apr 8, 2026",
    progress: 0,
    freelancer: { name: "Elena Rodriguez" },
  },
]

const activities = [
  { id: "1", type: "milestone" as const, title: "Milestone Completed", description: "E-commerce Platform - Payment Integration", time: "2 hours ago", user: { name: "Sarah Chen" } },
  { id: "2", type: "message" as const, title: "New Message", description: "Marcus sent you project updates", time: "4 hours ago", user: { name: "Marcus Johnson" } },
  { id: "3", type: "proposal" as const, title: "New Proposal", description: "Received proposal for API Integration project", time: "6 hours ago", user: { name: "David Park" } },
  { id: "4", type: "payment" as const, title: "Payment Processed", description: "$2,400 released to Sarah Chen", time: "1 day ago" },
  { id: "5", type: "hire" as const, title: "Freelancer Hired", description: "Elena Rodriguez joined Brand Identity project", time: "2 days ago", user: { name: "Elena Rodriguez" } },
]

const aiRecommendations = [
  { name: "Sarah Chen", role: "Full-Stack Developer", match: 96, skills: ["React", "Node.js", "AWS"] },
  { name: "James Miller", role: "DevOps Engineer", match: 92, skills: ["Docker", "K8s", "CI/CD"] },
]

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects</p>
        </div>
        <Link href="/dashboard/client/projects/new">
          <GradientButton>
            <Plus className="w-4 h-4 mr-2" />
            Post New Project
          </GradientButton>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Projects</h2>
            <Link href="/dashboard/client/projects">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.id} project={project} role="client" />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Recommendations</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Top freelancers matching your project needs
            </p>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {rec.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{rec.name}</p>
                      <p className="text-xs text-muted-foreground">{rec.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gradient">{rec.match}%</div>
                    <div className="text-xs text-muted-foreground">match</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/client/talent">
              <Button variant="outline" className="w-full mt-4">
                Explore All Talent
              </Button>
            </Link>
          </GlassCard>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  )
}
