import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"

interface FreelancerRecommendation {
  id: string
  name: string
  role: string
  avatar?: string
  matchScore: number
  hourlyRate: string
  rating: number
  reviews: number
  location: string
  availability: string
  skills: string[]
  completedProjects: number
  matchReasons: string[]
}

interface AIRecommendationCardProps {
  freelancer: FreelancerRecommendation
  projectTitle?: string
}

export function AIRecommendationCard({ freelancer, projectTitle }: AIRecommendationCardProps) {
  return (
    <GlassCard hover className="relative overflow-hidden">
      {/* AI Badge */}
      <div className="absolute top-4 right-4">
        <Badge className="gradient-primary text-primary-foreground gap-1">
          <Sparkles className="w-3 h-3" />
          {freelancer.matchScore}% Match
        </Badge>
      </div>

      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-primary/20 text-primary text-lg">
            {freelancer.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg">{freelancer.name}</h3>
          <p className="text-muted-foreground">{freelancer.role}</p>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium text-foreground">{freelancer.rating}</span>
              <span className="text-muted-foreground">({freelancer.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {freelancer.location}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-muted/50">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{freelancer.hourlyRate}</p>
          <p className="text-xs text-muted-foreground">Hourly Rate</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-lg font-bold text-foreground">{freelancer.completedProjects}</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-success" />
            <p className="text-sm font-medium text-success">{freelancer.availability}</p>
          </div>
          <p className="text-xs text-muted-foreground">Availability</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Match Reasons */}
      <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-primary">Why this match?</p>
        </div>
        <ul className="space-y-1">
          {freelancer.matchReasons.map((reason, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">-</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          View Profile
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <Button className="flex-1 gradient-primary">
          Invite to Project
        </Button>
      </div>
    </GlassCard>
  )
}
