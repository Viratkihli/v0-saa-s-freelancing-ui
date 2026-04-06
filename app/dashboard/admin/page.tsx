import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RevenueChart, UserDistributionChart } from "@/components/dashboard/admin-charts"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  AlertTriangle, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  { title: "Total Users", value: "22,500", change: { value: "+12%", trend: "up" as const }, icon: Users, iconColor: "bg-primary/10 text-primary" },
  { title: "Monthly Revenue", value: "$72,000", change: { value: "+18%", trend: "up" as const }, icon: DollarSign, iconColor: "bg-success/10 text-success" },
  { title: "Active Projects", value: "1,248", change: { value: "+8%", trend: "up" as const }, icon: Briefcase, iconColor: "bg-accent/10 text-accent" },
  { title: "Open Disputes", value: "12", change: { value: "-25%", trend: "up" as const }, icon: AlertTriangle, iconColor: "bg-warning/10 text-warning" },
]

const activities = [
  { id: "1", type: "hire" as const, title: "New User Registered", description: "John Smith joined as a freelancer", time: "5 min ago", user: { name: "John Smith" } },
  { id: "2", type: "payment" as const, title: "Large Transaction", description: "$15,000 escrow deposit from TechCorp", time: "1 hour ago" },
  { id: "3", type: "alert" as const, title: "Dispute Filed", description: "Project #4521 - Payment dispute", time: "2 hours ago" },
  { id: "4", type: "milestone" as const, title: "Project Completed", description: "E-commerce Platform - Successfully delivered", time: "3 hours ago" },
  { id: "5", type: "hire" as const, title: "Enterprise Account", description: "DataFlow Ltd. upgraded to Enterprise", time: "5 hours ago" },
]

const pendingVerifications = [
  { id: "v1", name: "Sarah Chen", type: "Identity", submitted: "2 hours ago", status: "pending" },
  { id: "v2", name: "Marcus Johnson", type: "Skills", submitted: "4 hours ago", status: "pending" },
  { id: "v3", name: "Elena Rodriguez", type: "Portfolio", submitted: "6 hours ago", status: "pending" },
]

const recentTransactions = [
  { id: "t1", from: "TechCorp Inc.", to: "Sarah Chen", amount: "$2,400", status: "completed", time: "1 hour ago" },
  { id: "t2", from: "DataFlow Ltd.", to: "Marcus Johnson", amount: "$1,800", status: "pending", time: "2 hours ago" },
  { id: "t3", from: "StartupXYZ", to: "Elena Rodriguez", amount: "$950", status: "completed", time: "3 hours ago" },
  { id: "t4", from: "DesignCo", to: "David Park", amount: "$3,200", status: "failed", time: "4 hours ago" },
]

const statusColors = {
  completed: "bg-success/20 text-success",
  pending: "bg-warning/20 text-warning",
  failed: "bg-destructive/20 text-destructive",
}

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle,
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin/reports">
            <Button variant="outline">Generate Report</Button>
          </Link>
          <Link href="/dashboard/admin/settings">
            <Button>Platform Settings</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserDistributionChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recent Transactions</h3>
              <Link href="/dashboard/admin/transactions">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">From</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">To</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => {
                    const StatusIcon = statusIcons[tx.status as keyof typeof statusIcons]
                    return (
                      <tr key={tx.id} className="border-b border-border last:border-0">
                        <td className="py-3 px-2 text-sm text-foreground">{tx.from}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{tx.to}</td>
                        <td className="py-3 px-2 text-sm font-medium text-foreground">{tx.amount}</td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className={statusColors[tx.status as keyof typeof statusColors]}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">{tx.time}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Verifications */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Pending Verifications</h3>
              <Badge variant="secondary">{pendingVerifications.length}</Badge>
            </div>
            <div className="space-y-3">
              {pendingVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning font-semibold text-sm">
                      {verification.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{verification.name}</p>
                      <p className="text-xs text-muted-foreground">{verification.type} verification</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-success hover:text-success">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/admin/verifications">
              <Button variant="outline" className="w-full mt-4">
                View All Verifications
              </Button>
            </Link>
          </GlassCard>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} title="Platform Activity" />
        </div>
      </div>
    </div>
  )
}
