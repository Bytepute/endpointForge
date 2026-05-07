import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches

    const initialTheme = storedTheme ?? (systemPrefersDark ? "dark" : "light")

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    setThemeState(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const setTheme = (newTheme: Theme) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme, setTheme }
}
