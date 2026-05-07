import { Button } from "#/components/ui/button"
import { useTheme } from "#/hooks/use-theme"
import { Moon, Sun } from "lucide-react"

export default function ProjectSidebarFooter() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between">
      <div className="text-xs text-muted-foreground">
        <p>Endpoint Forge v1.0</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-8 w-8"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
