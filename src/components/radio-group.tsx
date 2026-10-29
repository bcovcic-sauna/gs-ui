import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"
import { Check, Circle, Plus } from 'lucide-react'

import { cn } from "../utils/utils"

// default: standard shadcn/ui radio. picker: the CPQ EditQuotePage style.
// segmented: bordered tiles with the label inside.
type RadioGroupVariant = "default" | "picker" | "segmented"

type RadioGroupContextValue = {
  deselectable: boolean
  currentValue: string
  onDeselect: () => void
  variant: RadioGroupVariant
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  deselectable: false,
  currentValue: "",
  onDeselect: () => {},
  variant: "default",
})

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  deselectable?: boolean
  variant?: RadioGroupVariant
}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, deselectable = false, variant = "default", onValueChange, value, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value ?? props.defaultValue ?? "")

  const isControlled = value !== undefined
  const currentValue = isControlled ? (value ?? "") : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  const handleDeselect = () => handleValueChange("")

  return (
    <RadioGroupContext.Provider value={{ deselectable, currentValue, onDeselect: handleDeselect, variant }}>
      <RadioGroupPrimitive.Root
        className={cn(variant === "segmented" ? "flex flex-wrap gap-2" : "grid gap-2", className)}
        {...props}
        value={deselectable ? currentValue : value}
        onValueChange={deselectable ? handleValueChange : onValueChange}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioGroupItemVariants = cva(
  "",
  {
    variants: {
      variant: {
        // Standard shadcn/ui radio: small bordered circle with a filled dot
        default: "aspect-square h-4 w-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        // CPQ EditQuotePage style: a plus that turns into an amber check when selected
        picker: "relative rounded-full h-6 w-6 text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 group hover:bg-primary/20 hover:border hover:border-primary/20 data-[state=checked]:rounded-full data-[state=checked]:border data-[state=checked]:border-amber-600/20 data-[state=checked]:bg-amber-600/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Bordered tile with the radio circle and label inside, used by <RadioGroup variant="segmented">
const segmentedItemClasses =
  "group inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground ring-offset-background transition-colors cursor-pointer " +
  "hover:border-primary/30 hover:bg-primary/5 " +
  "data-[state=checked]:border-primary/50 data-[state=checked]:bg-primary/10 data-[state=checked]:text-accent-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50"

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, onClick, children, ...props }, ref) => {
  // The variant is set once on RadioGroup and shared with every item
  const { deselectable, currentValue, onDeselect, variant } = React.useContext(RadioGroupContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (deselectable && currentValue === props.value) {
      e.preventDefault()
      onDeselect()
    }
    onClick?.(e)
  }

  // Segmented tiles render separately because the label sits inside the tile
  if (variant === "segmented") {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(segmentedItemClasses, className)}
        onClick={handleClick}
        {...props}
      >
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-input dark:group-data-[state=unchecked]:border-muted-foreground group-data-[state=checked]:border-primary">
          <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-primary" />
        </span>
        <span>{children}</span>
      </RadioGroupPrimitive.Item>
    )
  }

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ variant }), className)}
      onClick={handleClick}
      {...props}
    >
      {variant === "default" ? (
        <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
          <Circle className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary stroke-primary" />
        </RadioGroupPrimitive.Indicator>
      ) : (
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center group">
          <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 animate-ping-once" strokeWidth={4} />
          <Check className="h-3 w-3 text-amber-800 dark:text-amber-300 absolute" strokeWidth={4} />
        </RadioGroupPrimitive.Indicator>
      )}

      {variant === "picker" && (
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
