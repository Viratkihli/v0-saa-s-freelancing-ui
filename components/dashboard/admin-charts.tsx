"use client"

import { GlassCard } from "@/components/ui/glass-card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 45000, transactions: 320 },
  { month: "Feb", revenue: 52000, transactions: 380 },
  { month: "Mar", revenue: 48000, transactions: 350 },
  { month: "Apr", revenue: 61000, transactions: 420 },
  { month: "May", revenue: 55000, transactions: 390 },
  { month: "Jun", revenue: 72000, transactions: 480 },
]

const userDistribution = [
  { name: "Freelancers", value: 12500, color: "hsl(var(--primary))" },
  { name: "Clients", value: 8200, color: "hsl(var(--accent))" },
  { name: "Enterprise", value: 1800, color: "hsl(var(--chart-3))" },
]

export function RevenueChart() {
  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Revenue Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Transactions"
              ]}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

export function UserDistributionChart() {
  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold text-foreground mb-4">User Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {userDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [value.toLocaleString(), "Users"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
