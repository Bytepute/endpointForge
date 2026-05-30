import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 *
 * @param value path input string to add slash at its beginning
 * @returns path with slash
 */
export function ensureLeadingSlash(value: string) {
  if (!value) return ""
  if (!value.startsWith("/")) {
    return `/${value}`
  }

  return value
}
