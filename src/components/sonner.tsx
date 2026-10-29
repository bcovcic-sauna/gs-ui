"use client"

import * as React from "react"
import { CircleCheck, OctagonX } from "lucide-react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

// Theme is passed in by the app instead of read from next-themes, because the
// apps using this library each manage the theme with their own provider.
// Colours use Tailwind token classes rather than raw CSS variables, because
// apps store the tokens in different formats (bare HSL vs full colour values).
// The ! modifier is needed to beat Sonner's own attribute selectors.
const Toaster = ({ theme = "light", toastOptions, style, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{ fontFamily: "inherit", ...style }}
      icons={{
        success: <CircleCheck className="size-4 text-primary" />,
        // Dark --destructive is a background red and too dark for an icon on a dark toast
        error: <OctagonX className="size-4 text-destructive dark:text-red-400" />,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "!bg-popover !text-popover-foreground !border-border !rounded-lg !shadow-lg",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground",
          cancelButton: "!bg-muted !text-muted-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
export type { ToasterProps }
