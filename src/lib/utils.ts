import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Adds a leading slash to a string if it doesn't have one
 * @param value - The value to check if it starts with a slash
 * @returns The value with a leading slash if it doesn't have one
 */
export function withLeadingSlash(value: string): string {
  if (!value) return value
  return value.startsWith("/") ? value : `/${value}`
}
