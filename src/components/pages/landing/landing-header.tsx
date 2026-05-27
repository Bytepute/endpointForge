import ThemeToggle from "#/components/theme-toggle"
import { useScrollToSection } from "#/hooks/use-scroll-to-section"
import { Button } from "@/components/ui/button"
import LoginDialog from "./login-dialog"
import RegisterDialog from "./register-dialog"
import { useAuthStore } from "#/stores/auth-store"
import LandingLanguageToggle from "./language-toggle"
import { useLandingI18n } from "./landing-i18n"

export default function LandingHeader() {
  const scrollToSection = useScrollToSection()
  const isAuthReady = useAuthStore((state) => state.isAuthReady)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen)
  const isRegisterModalOpen = useAuthStore((state) => state.isRegisterModalOpen)
  const setLoginModal = useAuthStore((state) => state.setLoginModal)
  const setRegisterModal = useAuthStore((state) => state.setRegisterModal)
  const { text } = useLandingI18n()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/70">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <p className="font-bold text-xl">endpointForge</p>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Button onClick={() => scrollToSection("features")} variant={"link"}>
            {text.nav.features}
          </Button>
          <Button
            onClick={() => scrollToSection("how-it-works")}
            variant={"link"}
          >
            {text.nav.howItWorks}
          </Button>
          <Button onClick={() => scrollToSection("donate")} variant={"link"}>
            {text.nav.donate}
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LandingLanguageToggle />
          <ThemeToggle />
          {isAuthReady && !isLoggedIn && (
            <>
              <LoginDialog
                open={isLoginModalOpen}
                onOpenChange={setLoginModal}
              />
              <RegisterDialog
                open={isRegisterModalOpen}
                onOpenChange={setRegisterModal}
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
