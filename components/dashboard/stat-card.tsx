import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: {
    value: string
    trend: "up" | "down"
  }
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ title, value, change, icon: Icon, iconColor = "bg-primary/10 text-primary" }: StatCardProps) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {change.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  change.trend === "up" ? "text-success" : "text-destructive"
                )}
              >
                {change.value}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </GlassCard>
  )
}
