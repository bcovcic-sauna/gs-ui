import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../utils/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground border border-primary/20",
        secondary:
          "border-transparent bg-primary/10 text-accent-foreground border border-primary/20",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        accent: "bg-amber-600/10 shadow-none border-amber-600/30 text-amber-800 dark:text-amber-300",
        filter: "rounded-full border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

