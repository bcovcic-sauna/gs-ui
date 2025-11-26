import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Plus } from 'lucide-react'

import { cn } from "../utils/utils"

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioGroupItemVariants = cva(
  "relative rounded-full h-6 w-6 text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 group hover:bg-primary/20 hover:border hover:border-primary/20 data-[state=checked]:rounded-full data-[state=checked]:border data-[state=checked]:border-amber-600/20 data-[state=checked]:bg-amber-600/30",
  {
    variants: {
      variant: {
        default: "relative rounded-full h-6 w-6 text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 group hover:bg-primary/20 hover:border hover:border-primary/20 data-[state=checked]:rounded-full data-[state=checked]:border data-[state=checked]:border-amber-600/20 data-[state=checked]:bg-amber-600/30",
        simple: "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioGroupItemVariants>
>(({ className, variant, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(radioGroupItemVariants({ variant }), className)}
        {...props}
      >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center group">
        {variant === "simple" ? (
          <CheckIcon className="h-3.5 w-3.5 fill-primary" />
        ) : (
          <>
            <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 animate-ping-once" strokeWidth={4} />
            <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 absolute" strokeWidth={4} />
          </>
        )}
      </RadioGroupPrimitive.Indicator>
      
      {variant !== "simple" && (
        <div className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2">
          <Plus
            className="group-data-[state=checked]:hidden h-4 w-4 text-muted-foreground/40 group-hover:text-primary"
          />
        </div>
      )}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, radioGroupItemVariants }

