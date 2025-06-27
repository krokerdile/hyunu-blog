import * as React from "react"
import { cn } from "../../lib/utils"

export function Tabs({ defaultValue, className, children }: { defaultValue?: string; className?: string; children: React.ReactNode }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, { value, setValue })
        }
        return child
      })}
    </div>
  )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex border-b mb-4", className)}>{children}</div>
}

export function TabsTrigger({ value: triggerValue, value, setValue, children, className }: any) {
  const isActive = value === triggerValue
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
        isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300",
        className
      )}
      onClick={() => setValue(triggerValue)}
      type="button"
    >
      {children}
    </button>
  )
}

export function TabsContent({ value: contentValue, value, children, className }: any) {
  if (value !== contentValue) return null
  return <div className={cn("mt-2", className)}>{children}</div>
} 