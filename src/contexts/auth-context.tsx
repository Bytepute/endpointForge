import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { ReactNode } from "react"
import { authApi } from "#/backend/api/auth-api"
import { authTokenService } from "#/backend/services/auth-token.service"

type AuthContextValue = {
  accessToken: string | null
  isLoggedIn: boolean
  isAuthReady: boolean
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    authTokenService.getAccessToken(),
  )
  const [isAuthReady, setIsAuthReady] = useState(() =>
    authTokenService.hasAccessToken(),
  )

  useEffect(() => {
    return authTokenService.subscribe(setAccessTokenState)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function bootstrapAuth() {
      if (authTokenService.hasAccessToken()) {
        setIsAuthReady(true)
        return
      }

      try {
        const session = await authApi.refreshToken()
        authTokenService.setAccessToken(session.accessToken)
      } catch {
        authTokenService.clearAccessToken()
      } finally {
        if (isMounted) {
          setIsAuthReady(true)
        }
      }
    }

    void bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const setAccessToken = useCallback((token: string) => {
    authTokenService.setAccessToken(token)
    setIsAuthReady(true)
  }, [])

  const clearAccessToken = useCallback(() => {
    authTokenService.clearAccessToken()
    setIsAuthReady(true)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isLoggedIn: Boolean(accessToken),
      isAuthReady,
      setAccessToken,
      clearAccessToken,
    }),
    [accessToken, clearAccessToken, isAuthReady, setAccessToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
