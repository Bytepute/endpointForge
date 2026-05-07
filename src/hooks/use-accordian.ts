import { useState, useCallback } from "react"

export function useAccordion(initialExpanded: Record<string, boolean> = {}) {
  const [expanded, setExpanded] =
    useState<Record<string, boolean>>(initialExpanded)

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const isExpanded = useCallback((key: string) => !!expanded[key], [expanded])

  return { expanded, toggle, isExpanded }
}
