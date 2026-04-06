"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  CreditCard,
  Settings,
  Users,
  BarChart3,
  FileText,
  Bell,
  HelpCircle,
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "client" | "freelancer" | "admin"
}

const roleNavItems = {
  client: [
    { href: "/dashboard/client", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/client/projects", icon: Briefcase, label: "My Projects" },
    { href: "/dashboard/client/talent", icon: Users, label: "Find Talent" },
    { href: "/dashboard/client/messages", icon: MessageSquare, label: "Messages" },
    { href: "/dashboard/client/payments", icon: CreditCard, label: "Payments" },
    { href: "/dashboard/client/reports", icon: BarChart3, label: "Reports" },
  ],
  freelancer: [
    { href: "/dashboard/freelancer", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/freelancer/projects", icon: Briefcase, label: "My Projects" },
    { href: "/dashboard/freelancer/proposals", icon: FileText, label: "Proposals" },
    { href: "/dashboard/freelancer/messages", icon: MessageSquare, label: "Messages" },
    { href: "/dashboard/freelancer/earnings", icon: CreditCard, label: "Earnings" },
    { href: "/dashboard/freelancer/analytics", icon: BarChart3, label: "Analytics" },
  ],
  admin: [
    { href: "/dashboard/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/admin/users", icon: Users, label: "Users" },
    { href: "/dashboard/admin/projects", icon: Briefcase, label: "Projects" },
    { href: "/dashboard/admin/transactions", icon: CreditCard, label: "Transactions" },
    { href: "/dashboard/admin/reports", icon: FileText, label: "Reports" },
    { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics" },
  ],
}

const bottomNavItems = [
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help" },
]

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const navItems = roleNavItems[role]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">PrimePath</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 border-t border-sidebar-border">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200">
              <LogOut className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm font-medium">Log out</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
