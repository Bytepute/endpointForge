import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { useCurrentUser } from "#/hooks/use-current-user"
import { useLogout } from "#/hooks/use-logout"
import { cn } from "#/lib/utils"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  ChevronsUpDown,
  LogOut,
  Loader2,
  Moon,
  Sun,
  UserRound,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "#/hooks/use-theme"

function getInitials(username?: string) {
  return username?.slice(0, 2).toUpperCase() ?? "EF"
}

export default function SidebarUserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const currentPath = useRouterState().location.pathname
  const user = useCurrentUser()
  const logout = useLogout()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", closeMenu)
    return () => document.removeEventListener("mousedown", closeMenu)
  }, [])

  if (user.isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-sidebar-border p-2">
        <Skeleton className="size-10 shrink-0 rounded-md" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div ref={menuRef} className="relative">
      {open && (
        <div className="absolute inset-x-0 bottom-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-md border border-sidebar-border bg-popover p-1 text-popover-foreground shadow-lg">
          <Link
            to="/projects/profile"
            className={cn(
              "flex h-9 items-center gap-2 rounded-sm px-2 text-sm outline-none hover:bg-accent focus-visible:bg-accent",
              currentPath === "/projects/profile" && "bg-accent",
            )}
            onClick={() => setOpen(false)}
          >
            <UserRound className="size-4" />
            Profile
          </Link>
          <button
            type="button"
            className="flex h-9 w-full items-center gap-2 rounded-sm px-2 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 rotate-0 scale-100 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            className="flex h-9 w-full items-center gap-2 rounded-sm px-2 text-left text-sm text-destructive outline-none hover:bg-destructive/10 focus-visible:bg-destructive/10"
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
          >
            {logout.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            Logout
          </button>
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        aria-expanded={open}
        aria-label="Open account menu"
        className="h-auto w-full justify-start gap-3 rounded-md border border-transparent p-2 text-sidebar-foreground hover:border-sidebar-border hover:bg-sidebar-accent"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent text-sm font-semibold">
          {getInitials(user.data?.username)}
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-semibold">
            {user.data?.username ?? "Account"}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Profile and session
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </Button>
    </div>
  )
}
