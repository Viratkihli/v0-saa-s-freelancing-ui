"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "gradient-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/25":
              variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80":
              variant === "secondary",
            "border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary":
              variant === "outline",
          },
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GradientButton.displayName = "GradientButton"
