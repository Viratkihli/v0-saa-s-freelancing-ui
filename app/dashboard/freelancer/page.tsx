import { StatCard } from "@/components/dashboard/stat-card"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { EarningsChart } from "@/components/dashboard/earnings-chart"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Briefcase, Star, Clock, ArrowRight, Sparkles, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  { title: "Total Earnings", value: "$34,500", change: { value: "+22%", trend: "up" as const }, icon: DollarSign, iconColor: "bg-success/10 text-success" },
  { title: "Active Projects", value: "5", change: { value: "+1", trend: "up" as const }, icon: Briefcase, iconColor: "bg-primary/10 text-primary" },
  { title: "Avg. Rating", value: "4.9", change: { value: "+0.2", trend: "up" as const }, icon: Star, iconColor: "bg-warning/10 text-warning" },
  { title: "Response Time", value: "1.2h", change: { value: "-18%", trend: "up" as const }, icon: Clock, iconColor: "bg-accent/10 text-accent" },
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
    client: { name: "TechCorp Inc." },
  },
  {
    id: "2",
    title: "SaaS Dashboard Development",
    description: "Build analytics dashboard with real-time data visualization",
    status: "active" as const,
    budget: "$8,500",
    deadline: "Apr 20, 2026",
    progress: 40,
    client: { name: "DataFlow Ltd." },
  },
]

const activities = [
  { id: "1", type: "payment" as const, title: "Payment Received", description: "$2,400 for E-commerce milestone", time: "2 hours ago" },
  { id: "2", type: "message" as const, title: "New Message", description: "TechCorp sent feedback on designs", time: "4 hours ago", user: { name: "TechCorp" } },
  { id: "3", type: "milestone" as const, title: "Milestone Approved", description: "SaaS Dashboard - API Integration", time: "6 hours ago" },
  { id: "4", type: "proposal" as const, title: "Proposal Viewed", description: "Mobile App project proposal was viewed", time: "1 day ago" },
]

const recommendedProjects = [
  { 
    id: "r1", 
    title: "React Native App", 
    budget: "$5,000 - $8,000", 
    match: 94,
    skills: ["React Native", "TypeScript"],
    proposals: 12 
  },
  { 
    id: "r2", 
    title: "API Development", 
    budget: "$3,000 - $5,000", 
    match: 89,
    skills: ["Node.js", "PostgreSQL"],
    proposals: 8 
  },
  { 
    id: "r3", 
    title: "Landing Page Design", 
    budget: "$1,500 - $2,500", 
    match: 85,
    skills: ["Figma", "UI/UX"],
    proposals: 15 
  },
]

export default function FreelancerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">Your freelance business at a glance</p>
        </div>
        <Link href="/dashboard/freelancer/proposals">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Proposals
          </Button>
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
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Chart */}
          <EarningsChart />

          {/* Active Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Active Projects</h2>
              <Link href="/dashboard/freelancer/projects">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} role="freelancer" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* AI Job Recommendations */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recommended Jobs</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Projects matching your skills and preferences
            </p>
            <div className="space-y-3">
              {recommendedProjects.map((project) => (
                <Link 
                  key={project.id} 
                  href={`/dashboard/freelancer/projects/${project.id}`}
                  className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{project.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {project.match}% match
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{project.budget}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{project.proposals} proposals</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/dashboard/freelancer/find-work">
              <Button variant="outline" className="w-full mt-4">
                Browse All Jobs
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
