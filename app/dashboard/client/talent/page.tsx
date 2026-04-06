"use client"

import { useState } from "react"
import { AIRecommendationCard } from "@/components/ai/ai-recommendation-card"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal,
  MapPin,
  DollarSign
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const freelancers = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    matchScore: 96,
    hourlyRate: "$85",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    availability: "Available",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    completedProjects: 89,
    matchReasons: [
      "Expert in React and Node.js - perfect for your tech stack",
      "Previous experience with e-commerce platforms",
      "Excellent communication skills based on reviews",
    ],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Mobile Developer",
    matchScore: 92,
    hourlyRate: "$95",
    rating: 4.8,
    reviews: 98,
    location: "Austin, TX",
    availability: "Available",
    skills: ["React Native", "Swift", "Kotlin", "Firebase", "GraphQL"],
    completedProjects: 67,
    matchReasons: [
      "Specialized in cross-platform mobile development",
      "Strong portfolio of published apps",
      "Experience with your industry sector",
    ],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    matchScore: 89,
    hourlyRate: "$75",
    rating: 5.0,
    reviews: 156,
    location: "Miami, FL",
    availability: "Limited",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    completedProjects: 124,
    matchReasons: [
      "Top-rated designer with perfect reviews",
      "Expertise in SaaS and marketplace design",
      "Fast turnaround on previous projects",
    ],
  },
  {
    id: "4",
    name: "David Park",
    role: "DevOps Engineer",
    matchScore: 87,
    hourlyRate: "$110",
    rating: 4.9,
    reviews: 72,
    location: "Seattle, WA",
    availability: "Available",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    completedProjects: 54,
    matchReasons: [
      "Certified AWS Solutions Architect",
      "Experience scaling applications similar to yours",
      "Strong security background",
    ],
  },
]

const skillFilters = ["React", "Node.js", "Python", "AWS", "Mobile", "UI/UX", "DevOps"]

export default function FindTalentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch =
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) =>
        freelancer.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
      )

    return matchesSearch && matchesSkills
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Talent</h1>
          <p className="text-muted-foreground">AI-powered recommendations for your projects</p>
        </div>
      </div>

      {/* AI Banner */}
      <GlassCard className="p-4 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI-Powered Matching</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your project requirements and matches you with the best freelancers based on skills, 
              experience, and past performance.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, skill, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Skill Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {skillFilters.map((skill) => (
              <Button
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Button>
            ))}
          </div>

          {/* More Filters */}
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Any Location</DropdownMenuItem>
                <DropdownMenuItem>United States</DropdownMenuItem>
                <DropdownMenuItem>Europe</DropdownMenuItem>
                <DropdownMenuItem>Asia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Rate
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hourly Rate</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Any Rate</DropdownMenuItem>
                <DropdownMenuItem>Under $50/hr</DropdownMenuItem>
                <DropdownMenuItem>$50 - $100/hr</DropdownMenuItem>
                <DropdownMenuItem>Over $100/hr</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Best Match</DropdownMenuItem>
                <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                <DropdownMenuItem>Most Reviews</DropdownMenuItem>
                <DropdownMenuItem>Lowest Rate</DropdownMenuItem>
                <DropdownMenuItem>Highest Rate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {selectedSkills.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <button onClick={() => toggleSkill(skill)} className="ml-1 hover:text-destructive">
                  x
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSkills([])}
              className="text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </GlassCard>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredFreelancers.length}</span> freelancers
          </p>
        </div>

        {filteredFreelancers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <AIRecommendationCard key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        ) : (
          <GlassCard className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No freelancers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedSkills([]) }}>
              Clear Filters
            </Button>
          </GlassCard>
        )}
      </div>
    </div>
  )
}
