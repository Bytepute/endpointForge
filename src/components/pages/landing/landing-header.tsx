import ThemeToggle from "#/components/theme-toggle"
import { useScrollToSection } from "#/hooks/use-scroll-to-section"
import { Button } from "@/components/ui/button"
import LoginDialog from "./login-dialog"
import RegisterDialog from "./register-dialog"
import { authTokenService } from "#/backend/services/auth-token.service"
import { useEffect, useState } from "react"

export default function LandingHeader() {
  const scrollToSection = useScrollToSection()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(authTokenService.hasAccessToken())
    }

    syncAuthState()
    window.addEventListener(authTokenService.tokenChangedEvent, syncAuthState)
    window.addEventListener("storage", syncAuthState)

    return () => {
      window.removeEventListener(
        authTokenService.tokenChangedEvent,
        syncAuthState,
      )
      window.removeEventListener("storage", syncAuthState)
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
          {!isLoggedIn && (
            <>
              <LoginDialog />
              <RegisterDialog />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
