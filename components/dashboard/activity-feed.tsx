import { GlassCard } from "@/components/ui/glass-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { 
  CheckCircle, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  UserPlus,
  AlertCircle,
  Clock
} from "lucide-react"

interface Activity {
  id: string
  type: "milestone" | "message" | "payment" | "proposal" | "hire" | "alert" | "deadline"
  title: string
  description: string
  time: string
  user?: { name: string; avatar?: string }
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
}

const typeIcons = {
  milestone: CheckCircle,
  message: MessageSquare,
  payment: DollarSign,
  proposal: FileText,
  hire: UserPlus,
  alert: AlertCircle,
  deadline: Clock,
}

const typeColors = {
  milestone: "bg-success/20 text-success",
  message: "bg-primary/20 text-primary",
  payment: "bg-accent/20 text-accent",
  proposal: "bg-warning/20 text-warning",
  hire: "bg-primary/20 text-primary",
  alert: "bg-destructive/20 text-destructive",
  deadline: "bg-muted text-muted-foreground",
}

export function ActivityFeed({ activities, title = "Recent Activity" }: ActivityFeedProps) {
  return (
    <GlassCard>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = typeIcons[activity.type]
          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-3 pb-4",
                index !== activities.length - 1 && "border-b border-border"
              )}
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", typeColors[activity.type])}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {activity.user && (
                    <div className="flex items-center gap-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-[8px] bg-secondary">
                          {activity.user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
