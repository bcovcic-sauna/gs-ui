import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../utils/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

// Simple date formatter - apps can override this if needed
const formatDate = (date: Date): string => {
  return format(date, "PPP");
};

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  popoverClassName?: string;
  width?: string;
  maxWidth?: string;
  formatDateFn?: (date: Date) => string; // Allow apps to provide custom formatter
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange, className, popoverClassName, width, maxWidth, formatDateFn = formatDate }, ref) => {
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(
      value ? new Date(`${value}T00:00:00`) : undefined
    );

    const handleSelect = (date: Date | undefined) => {
      if (!date) return;

      // Normalize the date to local time for ISO string
      const localDateString = format(date, "yyyy-MM-dd");

      setInternalDate(date);
      if (onChange) {
        onChange(localDateString);
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              width || "w-[280px]",
              maxWidth,
              "justify-start text-left font-normal",
              !internalDate && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {internalDate ? formatDateFn(internalDate) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", popoverClassName)}>
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };

