import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "../utils/utils"
import { Check, Plus } from 'lucide-react'

const SelectorCheckbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-6 w-6 relative rounded-sm transition-colors group",
      "hover:bg-primary/20 hover:border hover:border-primary/20",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border data-[state=checked]:border-amber-600/20 data-[state=checked]:bg-amber-600/30",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 animate-ping-once" strokeWidth={4} />
      <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 absolute" strokeWidth={4} />
    </CheckboxPrimitive.Indicator>

    <div className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2">
      <Plus
        className="group-data-[state=checked]:hidden h-4 w-4 text-muted-foreground/40 group-hover:text-primary"
      />
    </div>
  </CheckboxPrimitive.Root>
))
SelectorCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { SelectorCheckbox }

