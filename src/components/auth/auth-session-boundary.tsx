import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"
import { notificationService } from "#/services/notification.service"
import { getSubdomain, redirectToRoot } from "#/utils/tenant"

export default function AuthSessionBoundary() {
  const navigate = useNavigate()
  const sessionExpired = useAuthStore((state) => state.sessionExpired)
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthReady = useAuthStore((state) => state.isAuthReady)
  const setLoginModal = useAuthStore((state) => state.setLoginModal)
  const resetSessionExpired = useAuthStore((state) => state.resetSessionExpired)

  // --- The Auto-Kick Effect ---
  useEffect(() => {
    // If auth has loaded, there is no token, and we are on a subdomain: KICK TO ROOT
    if (isAuthReady && !accessToken && getSubdomain()) {
      redirectToRoot()
    }
  }, [isAuthReady, accessToken])
  // ---------------------------------

  useEffect(() => {
    if (!sessionExpired) return

    notificationService.error("لطفاً دوباره وارد شوید", {
      direction: "rtl",
    })
    setLoginModal(true)
    resetSessionExpired()

    if (window.location.pathname !== "/") {
      void navigate({ to: "/" })
    }
  }, [navigate, setLoginModal, resetSessionExpired, sessionExpired])

  useEffect(() => {
    if (accessToken) {
      resetSessionExpired()
    }
  }, [accessToken, resetSessionExpired])

  return null
}
