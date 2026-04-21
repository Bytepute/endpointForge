import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Sun, Moon, SunMoon } from "lucide-react"

type ThemeMode = "light" | "dark" | "auto"

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "auto"

  const stored = window.localStorage.getItem("theme")
  if (stored === "light" || stored === "dark" || stored === "auto") {
    return stored
  }

  return "auto"
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode

  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(resolved)

  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", mode)
  }

  document.documentElement.style.colorScheme = resolved
}

export function getResolvedTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto")

  useEffect(() => {
    const initial = getInitialMode()
    setMode(initial)
    applyThemeMode(initial)
  }, [])

  useEffect(() => {
    if (mode !== "auto") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyThemeMode("auto")

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [mode])

  function toggleMode() {
    const next: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "auto" : "light"

    setMode(next)
    applyThemeMode(next)
    window.localStorage.setItem("theme", next)
  }

  const label =
    mode === "auto"
      ? "Theme mode: Auto. Click to switch to Light mode."
      : `Theme mode: ${mode}. Click to switch.`

  return (
    <Button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      variant="outline"
      size="icon"
    >
      {mode === "auto" ? (
        <SunMoon className="w-5 h-5" />
      ) : mode === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  )
}
