import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { authApi } from "#/backend/api/auth-api"
import { useAuthStore } from "#/stores/auth-store"
import { notificationService } from "#/services/notification.service"

export default function AuthSessionBoundary() {
  const navigate = useNavigate()
  const sessionExpired = useAuthStore((state) => state.sessionExpired)
  const accessToken = useAuthStore((state) => state.accessToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken)
  const setAuthReady = useAuthStore((state) => state.setAuthReady)
  const setLoginModal = useAuthStore((state) => state.setLoginModal)
  const resetSessionExpired = useAuthStore((state) => state.resetSessionExpired)

  useEffect(() => {
    let isMounted = true

    async function bootstrapAuth() {
      try {
        const session = await authApi.refreshToken()

        if (isMounted) {
          setAccessToken(session.accessToken)
        }
      } catch {
        if (isMounted) {
          clearAccessToken()
          setAuthReady(true)
        }
      }
    }

    void bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [clearAccessToken, setAccessToken, setAuthReady])

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
