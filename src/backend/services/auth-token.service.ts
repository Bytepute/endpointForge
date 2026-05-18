const ACCESS_TOKEN_KEY = "endpoint_forge_access_token"
const AUTH_TOKEN_CHANGED_EVENT = "endpoint-forge-auth-token-changed"

const dispatchAuthTokenChanged = () => {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT))
}

export const authTokenService = {
  tokenChangedEvent: AUTH_TOKEN_CHANGED_EVENT,

  getAccessToken() {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  setAccessToken(token: string) {
    if (typeof window === "undefined") return
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
    dispatchAuthTokenChanged()
  },

  clearAccessToken() {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    dispatchAuthTokenChanged()
  },

  hasAccessToken() {
    return Boolean(this.getAccessToken())
  },
}
