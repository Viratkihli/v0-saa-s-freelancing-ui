"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/dashboard/project-card"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  SlidersHorizontal
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data
const allProjects = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX design patterns and improved user experience",
    status: "active" as const,
    budget: "$12,000",
    deadline: "Apr 15, 2026",
    progress: 65,
    freelancer: { name: "Sarah Chen" },
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Native iOS and Android app for the e-commerce platform with seamless checkout and push notifications",
    status: "active" as const,
    budget: "$18,000",
    deadline: "May 30, 2026",
    progress: 35,
    freelancer: { name: "Marcus Johnson" },
  },
  {
    id: "3",
    title: "Brand Identity Package",
    description: "Logo, color scheme, typography, and brand guidelines for a modern tech startup",
    status: "pending" as const,
    budget: "$3,500",
    deadline: "Apr 8, 2026",
    progress: 0,
    freelancer: { name: "Elena Rodriguez" },
  },
  {
    id: "4",
    title: "API Integration Service",
    description: "Connect multiple third-party services including payment gateways and CRM systems",
    status: "active" as const,
    budget: "$8,500",
    deadline: "Apr 25, 2026",
    progress: 80,
    freelancer: { name: "David Park" },
  },
  {
    id: "5",
    title: "SEO Optimization Campaign",
    description: "Comprehensive SEO audit and optimization for improved search rankings",
    status: "completed" as const,
    budget: "$4,200",
    deadline: "Mar 15, 2026",
    progress: 100,
    freelancer: { name: "Lisa Wang" },
  },
  {
    id: "6",
    title: "Cloud Migration Project",
    description: "Migrate legacy infrastructure to AWS with improved scalability and security",
    status: "paused" as const,
    budget: "$15,000",
    deadline: "Jun 1, 2026",
    progress: 20,
    freelancer: { name: "James Miller" },
  },
]

const statusFilters = ["all", "active", "pending", "completed", "paused"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: allProjects.length,
    active: allProjects.filter(p => p.status === "active").length,
    pending: allProjects.filter(p => p.status === "pending").length,
    completed: allProjects.filter(p => p.status === "completed").length,
    paused: allProjects.filter(p => p.status === "paused").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <Link href="/dashboard/client/projects/new">
          <GradientButton>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </GradientButton>
        </Link>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
                <Badge variant="secondary" className="ml-2 bg-background/50">
                  {statusCounts[status as keyof typeof statusCounts]}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 ml-auto">
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
                <DropdownMenuItem>Newest first</DropdownMenuItem>
                <DropdownMenuItem>Oldest first</DropdownMenuItem>
                <DropdownMenuItem>Budget: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Budget: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Progress</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <div className={viewMode === "grid" 
          ? "grid md:grid-cols-2 xl:grid-cols-3 gap-4" 
          : "space-y-4"
        }>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} role="client" />
          ))}
        </div>
      ) : (
        <GlassCard className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setStatusFilter("all") }}>
            Clear Filters
          </Button>
        </GlassCard>
      )}
    </div>
  )
}
