import * as React from "react"
import { cn } from "../../lib/utils"

export function Tabs({ defaultValue, className, children }: { defaultValue?: string; className?: string; children: React.ReactNode }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { currentValue: value, setValue })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}
export function TabsList({ className, children }: TabsListProps) {
  return <div className={cn("flex border-b mb-4", className)}>{children}</div>
}

interface TabsTriggerProps {
  triggerValue: string;
  setValue: (v: string) => void;
  children: React.ReactNode;
  className?: string;
  currentValue: string;
}
export function TabsTrigger({ triggerValue, currentValue, setValue, children, className }: TabsTriggerProps) {
  const isActive = currentValue === triggerValue
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

interface TabsContentProps {
  contentValue: string;
  children: React.ReactNode;
  className?: string;
  currentValue: string;
}
export function TabsContent({ contentValue, currentValue, children, className }: TabsContentProps) {
  if (currentValue !== contentValue) return null
  return <div className={cn("mt-2", className)}>{children}</div>
} 