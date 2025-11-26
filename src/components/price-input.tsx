"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "./input";
import { cn } from "../utils/utils";

interface PriceInputProps {
  value: string;
  onChange: (value: number) => void;
  id?: string;
  symbol: string;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
}

const SYMBOLS = ["€", "$", "£"];

export default function PriceInput({
  value,
  onChange,
  id,
  symbol,
  placeholder = "Enter price in €",
  className,
  min,
  max,
}: PriceInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9.,]/g, "");
    // Replace all commas with dots
    newValue = newValue.replace(/,/g, ".");

    // Only allow one dot
    const parts = newValue.split(".");
    if (parts.length > 2) {
      // If more than one dot, join everything after the first dot
      newValue = parts[0] + "." + parts.slice(1).join("");
    }

    if (newValue.includes(".")) {
      const [integerPart, decimalPart] = newValue.split(".");
      const cleanedInteger = integerPart.replace(/^0+/, "") || "0";
      newValue = cleanedInteger + "." + decimalPart;
    } else if (newValue.length > 1 && newValue.startsWith("0")) {
      newValue = newValue.replace(/^0+/, "") || "0";
    }

    // Always update the input value first for immediate visual feedback
    setInputValue(newValue);

    // Validate against min/max only when we have a complete number
    if (/^\d*\.?\d*$/.test(newValue) && newValue !== "" && newValue !== ".") {
      const parsed = parseFloat(newValue);
      if (!isNaN(parsed)) {
        if (typeof max === "number" && parsed > max) {
          // Revert to previous valid value if max exceeded
          setInputValue(value);
          return;
        }
        if (typeof min === "number" && parsed < min) {
          // Still allow typing but don't call onChange until valid
          return;
        }

        onChange(parsed);
      }
    }
  };

  const handleBlur = () => {
    // If the current value is 0, clear the input
    if (inputValue !== "" && parseFloat(inputValue) === 0) {
      setInputValue("");
      onChange(0);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const paddingRight = value
        ? SYMBOLS.includes(symbol)
          ? "1.5rem" // Less padding required when its currency symbol
          : "2.5rem" // More padding required when its currency code
        : "0.5rem";
      inputRef.current.style.paddingRight = paddingRight;
    }
  }, [value, symbol, inputRef]);

  return (
    <div className={cn("w-3/4", className)}>
      <label htmlFor={id} className="sr-only">
        Price (€)
      </label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handlePriceChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="text-right text-md border-0 shadow-none hover:border focus:border focus:border-primary hover:shadow-sm hover:bg-background"
          placeholder={placeholder}
          aria-describedby={`${id}-currency`}
        />
        {value && (
          <span
            id={`${id}-currency`}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-[48%] text-gray-500 pointer-events-none"
            )}
            aria-hidden="true"
          >
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
}

export { PriceInput };

