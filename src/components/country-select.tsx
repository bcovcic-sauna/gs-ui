"use client";

import React from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "../utils/utils";

const COUNTRIES = countries.getNames("en", { select: "official" });
const COUNTRIES_SELECT_OPTIONS = Object.entries(COUNTRIES).map(
  ([value, label]) => ({
    value: countries.alpha2ToAlpha3(value) as string,
    label,
  })
);

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  selectTriggerId?: string;
  className?: string;
  contentClassName?: string;
  error?: boolean;
}
export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  selectTriggerId,
  className,
  contentClassName,
  error,
}) => {
  return (
    <Select value={value} onValueChange={onChange} key="country-select-section">
      <SelectTrigger
        id={selectTriggerId}
        className={cn("bg-background/70 focus:border-primary/40", className, {
          "border-red-500": error,
        })}
      >
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {COUNTRIES_SELECT_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

