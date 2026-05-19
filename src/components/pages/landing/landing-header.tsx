import ThemeToggle from "#/components/theme-toggle"
import { useScrollToSection } from "#/hooks/use-scroll-to-section"
import { Button } from "@/components/ui/button"
import LoginDialog from "./login-dialog"
import RegisterDialog from "./register-dialog"
import { useAuth } from "#/contexts/auth-context"
import { AUTH_SESSION_EXPIRED_EVENT } from "#/backend/api/base-api"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function LandingHeader() {
  const scrollToSection = useScrollToSection()
  const { isAuthReady, isLoggedIn } = useAuth()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    const showSessionExpiredLogin = () => {
      toast.error("نشست شما منقضی شده است. لطفاً دوباره وارد شوید")
      setIsLoginOpen(true)
    }

    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get("auth") === "session-expired") {
      showSessionExpiredLogin()
      searchParams.delete("auth")
      const nextSearch = searchParams.toString()
      const nextUrl = nextSearch
        ? `${window.location.pathname}?${nextSearch}`
        : window.location.pathname
      window.history.replaceState(null, "", nextUrl)
    }

    window.addEventListener(
      AUTH_SESSION_EXPIRED_EVENT,
      showSessionExpiredLogin,
    )

    return () => {
      window.removeEventListener(
        AUTH_SESSION_EXPIRED_EVENT,
        showSessionExpiredLogin,
      )
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/70">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <p className="font-bold text-xl">endpointForge</p>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Button onClick={() => scrollToSection("features")} variant={"link"}>
            امکانات
          </Button>
          <Button
            onClick={() => scrollToSection("how-it-works")}
            variant={"link"}
          >
            نحوه کار
          </Button>
          <Button onClick={() => scrollToSection("donate")} variant={"link"}>
            حمایت از پروژه
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthReady && !isLoggedIn && (
            <>
              <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
              <RegisterDialog />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
