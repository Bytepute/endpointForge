import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { ReactNode } from "react"
import { authTokenService } from "#/backend/services/auth-token.service"

type AuthContextValue = {
  accessToken: string | null
  isLoggedIn: boolean
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    authTokenService.getAccessToken(),
  )

  useEffect(() => {
    return authTokenService.subscribe(setAccessTokenState)
  }, [])

  const setAccessToken = useCallback((token: string) => {
    authTokenService.setAccessToken(token)
  }, [])

  const clearAccessToken = useCallback(() => {
    authTokenService.clearAccessToken()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isLoggedIn: Boolean(accessToken),
      setAccessToken,
      clearAccessToken,
    }),
    [accessToken, clearAccessToken, setAccessToken],
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
