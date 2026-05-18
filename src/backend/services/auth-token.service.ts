const ACCESS_TOKEN_KEY = "endpoint_forge_access_token"
const AUTH_TOKEN_CHANGED_EVENT = "endpoint-forge-auth-token-changed"

class AuthTokenService {
  public readonly tokenChangedEvent = AUTH_TOKEN_CHANGED_EVENT

  public getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  public setAccessToken(token: string): void {
    if (typeof window === "undefined") return
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
    this._dispatchAuthTokenChanged()
  }

  public clearAccessToken(): void {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    this._dispatchAuthTokenChanged()
  }

  public hasAccessToken(): boolean {
    return Boolean(this.getAccessToken())
  }

  private _dispatchAuthTokenChanged(): void {
    if (typeof window === "undefined") return
    window.dispatchEvent(new Event(this.tokenChangedEvent))
  }
}

export const authTokenService = new AuthTokenService()
