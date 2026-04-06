"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Clock, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    status: "active" | "completed" | "pending" | "paused"
    budget: string
    deadline: string
    progress: number
    client?: { name: string; avatar?: string }
    freelancer?: { name: string; avatar?: string }
  }
  role: "client" | "freelancer"
}

const statusColors = {
  active: "bg-success/20 text-success border-success/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  paused: "bg-muted text-muted-foreground border-muted-foreground/30",
}

export function ProjectCard({ project, role }: ProjectCardProps) {
  const person = role === "client" ? project.freelancer : project.client

  return (
    <GlassCard hover className="group">
      <div className="flex items-start justify-between mb-4">
        <Badge variant="outline" className={statusColors[project.status]}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Project</DropdownMenuItem>
            <DropdownMenuItem>Message {role === "client" ? "Freelancer" : "Client"}</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Cancel Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link href={`/dashboard/${role}/projects/${project.id}`}>
        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{project.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{project.budget}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{project.deadline}</span>
        </div>
      </div>

      {/* Person */}
      {person && (
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              {person.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{person.name}</p>
            <p className="text-xs text-muted-foreground">{role === "client" ? "Freelancer" : "Client"}</p>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
