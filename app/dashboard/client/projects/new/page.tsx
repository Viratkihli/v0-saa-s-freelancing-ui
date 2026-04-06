"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Sparkles, 
  Plus, 
  X,
  DollarSign,
  Calendar,
  FileText
} from "lucide-react"
import Link from "next/link"

const suggestedSkills = [
  "React", "Node.js", "Python", "AWS", "TypeScript", "UI/UX Design",
  "Mobile Development", "API Development", "Database Design", "DevOps"
]

const budgetRanges = [
  { label: "Under $1,000", value: "0-1000" },
  { label: "$1,000 - $5,000", value: "1000-5000" },
  { label: "$5,000 - $10,000", value: "5000-10000" },
  { label: "$10,000 - $25,000", value: "10000-25000" },
  { label: "$25,000+", value: "25000+" },
]

const timelines = [
  { label: "Less than 1 week", value: "week" },
  { label: "1 - 2 weeks", value: "2weeks" },
  { label: "2 - 4 weeks", value: "month" },
  { label: "1 - 3 months", value: "3months" },
  { label: "3+ months", value: "3months+" },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()])
      setCustomSkill("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/dashboard/client/projects")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/client/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post a New Project</h1>
          <p className="text-muted-foreground">Find the perfect freelancer for your project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Details */}
        <GlassCard>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Project Details
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., E-commerce Website Redesign"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail. What are your goals? What deliverables do you expect?"
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: Be specific about your requirements to attract the right freelancers
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Skills Required */}
        <GlassCard>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Skills Required
          </h2>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 py-1.5">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          <div className="space-y-3">
            <Label>Suggested Skills</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSkill(skill)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {skill}
                  </Button>
                ))}
            </div>
          </div>

          {/* Custom Skill */}
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Add custom skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
            />
            <Button type="button" variant="outline" onClick={addCustomSkill}>
              Add
            </Button>
          </div>
        </GlassCard>

        {/* Budget & Timeline */}
        <GlassCard>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Budget & Timeline
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-3">
              <Label>Budget Range</Label>
              <div className="space-y-2">
                {budgetRanges.map((range) => (
                  <label
                    key={range.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      budget === range.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={range.value}
                      checked={budget === range.value}
                      onChange={(e) => setBudget(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      budget === range.value ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {budget === range.value && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Expected Timeline
              </Label>
              <div className="space-y-2">
                {timelines.map((t) => (
                  <label
                    key={t.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      timeline === t.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={t.value}
                      checked={timeline === t.value}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      timeline === t.value ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {timeline === t.value && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* AI Insights */}
        <GlassCard className="border-primary/20 bg-primary/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI-Powered Matching</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Once you post your project, our AI will analyze your requirements and match you with 
                the most suitable freelancers. You&apos;ll receive personalized recommendations within minutes.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/client/projects">Cancel</Link>
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <GradientButton type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Project"}
            </GradientButton>
          </div>
        </div>
      </form>
    </div>
  )
}
