import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
          variant === "outline" && "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" 