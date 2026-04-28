// hooks/use-theme.ts
import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    // Check current theme from DOM
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    }

    // Initial check
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}
