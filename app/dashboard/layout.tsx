"use client"

import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Mock user data - in production this would come from auth
const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "client" as const,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Determine role from pathname
  const role = pathname.includes("/admin")
    ? "admin"
    : pathname.includes("/freelancer")
    ? "freelancer"
    : "client"

  const user = { ...mockUser, role }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar role={role} />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={cn("lg:pl-64 min-h-screen transition-all duration-300")}>
        <DashboardHeader user={user} onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
