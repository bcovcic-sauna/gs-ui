import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
    return emailRegex.test(email)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

