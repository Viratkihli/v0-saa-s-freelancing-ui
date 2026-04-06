"use client"

import { useState } from "react"
import { StatCard } from "@/components/dashboard/stat-card"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Download,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Plus
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
const stats = [
  { title: "Total Spent", value: "$24,500", change: { value: "+18%", trend: "up" as const }, icon: DollarSign, iconColor: "bg-primary/10 text-primary" },
  { title: "In Escrow", value: "$8,200", icon: CreditCard, iconColor: "bg-warning/10 text-warning" },
  { title: "This Month", value: "$6,400", change: { value: "+12%", trend: "up" as const }, icon: ArrowUpRight, iconColor: "bg-success/10 text-success" },
  { title: "Pending", value: "$2,100", icon: Clock, iconColor: "bg-accent/10 text-accent" },
]

const transactions = [
  { id: "1", type: "payment", description: "E-commerce Platform - Milestone 3", amount: "-$2,400", status: "completed", date: "Apr 5, 2026", recipient: "Sarah Chen" },
  { id: "2", type: "escrow", description: "Mobile App - Initial Deposit", amount: "-$6,000", status: "escrow", date: "Apr 4, 2026", recipient: "Marcus Johnson" },
  { id: "3", type: "payment", description: "Brand Identity - Final Payment", amount: "-$1,200", status: "completed", date: "Apr 3, 2026", recipient: "Elena Rodriguez" },
  { id: "4", type: "refund", description: "SEO Campaign - Partial Refund", amount: "+$350", status: "completed", date: "Apr 2, 2026", recipient: "Lisa Wang" },
  { id: "5", type: "payment", description: "API Integration - Milestone 2", amount: "-$1,800", status: "pending", date: "Apr 1, 2026", recipient: "David Park" },
  { id: "6", type: "escrow", description: "Cloud Migration - Phase 1", amount: "-$5,000", status: "escrow", date: "Mar 28, 2026", recipient: "James Miller" },
]

const statusColors = {
  completed: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  escrow: "bg-primary/20 text-primary border-primary/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
}

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  escrow: CreditCard,
  failed: XCircle,
}

const typeIcons = {
  payment: ArrowUpRight,
  escrow: CreditCard,
  refund: ArrowDownLeft,
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage transactions and billing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Transactions */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Transactions</DropdownMenuItem>
                <DropdownMenuItem>Payments</DropdownMenuItem>
                <DropdownMenuItem>Escrow</DropdownMenuItem>
                <DropdownMenuItem>Refunds</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Recipient</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => {
                const TypeIcon = typeIcons[tx.type as keyof typeof typeIcons]
                const StatusIcon = statusIcons[tx.status as keyof typeof statusIcons]
                return (
                  <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === "refund" ? "bg-success/20 text-success" : "bg-muted"
                      }`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-foreground">{tx.description}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-muted-foreground">{tx.recipient}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`text-sm font-medium ${
                        tx.amount.startsWith("+") ? "text-success" : "text-foreground"
                      }`}>
                        {tx.amount}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <Badge variant="outline" className={statusColors[tx.status as keyof typeof statusColors]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-muted-foreground">{tx.date}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
