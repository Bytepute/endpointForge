import { authApi } from "#/backend/api/auth-api"
import { useAuthStore } from "#/stores/auth-store"

export async function bootstrapAuthFn() {
  const store = useAuthStore.getState()

  if (store.isAuthReady) return

  try {
    const session = await authApi.refreshToken()
    store.setAccessToken(session.accessToken)
    store.setUsername(session.username)
  } catch (error) {
    store.clearAccessToken()
  } finally {
    store.setAuthReady(true)
  }
}
