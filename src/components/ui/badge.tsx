import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variant === "default" && "bg-blue-600 text-white border-transparent",
          variant === "secondary" && "bg-gray-200 text-gray-800 border-transparent dark:bg-gray-700 dark:text-gray-200",
          variant === "outline" && "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 bg-transparent",
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge" 