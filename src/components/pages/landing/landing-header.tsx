import ThemeToggle from "#/components/theme-toggle"
import { useScrollToSection } from "#/hooks/use-scroll-to-section"
import { Button } from "@/components/ui/button"
import LoginDialog from "./login-dialog"
import RegisterDialog from "./register-dialog"
import { useAuthStore } from "#/stores/auth-store"

export default function LandingHeader() {
  const scrollToSection = useScrollToSection()
  const isAuthReady = useAuthStore((state) => state.isAuthReady)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
  const loginModalOpen = useAuthStore((state) => state.loginModalOpen)
  const registerModalOpen = useAuthStore((state) => state.registerModalOpen)
  const openLoginModal = useAuthStore((state) => state.openLoginModal)
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal)
  const openRegisterModal = useAuthStore((state) => state.openRegisterModal)
  const closeRegisterModal = useAuthStore((state) => state.closeRegisterModal)

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
              <LoginDialog
                open={loginModalOpen}
                onOpenChange={(open) => {
                  if (open) {
                    openLoginModal()
                    return
                  }

                  closeLoginModal()
                }}
              />
              <RegisterDialog
                open={registerModalOpen}
                onOpenChange={(open) => {
                  if (open) {
                    openRegisterModal()
                    return
                  }

                  closeRegisterModal()
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
