import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureLeadingSlash(value: string) {
  if (!value) return ""
  if (!value.startsWith("/")) {
    return `/${value}`
  }

  return value
}
