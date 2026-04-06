"use client"

import { GlassCard } from "@/components/ui/glass-card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { month: "Jan", earnings: 4200 },
  { month: "Feb", earnings: 5100 },
  { month: "Mar", earnings: 4800 },
  { month: "Apr", earnings: 6300 },
  { month: "May", earnings: 5900 },
  { month: "Jun", earnings: 7200 },
]

interface EarningsChartProps {
  title?: string
}

export function EarningsChart({ title = "Earnings Overview" }: EarningsChartProps) {
  return (
    <GlassCard className="p-6">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Earnings"]}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
