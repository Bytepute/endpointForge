const AUTH_TOKEN_CHANGED_EVENT = "endpoint-forge-auth-token-changed"

type AuthTokenListener = (accessToken: string | null) => void

class AuthTokenService {
  public readonly tokenChangedEvent = AUTH_TOKEN_CHANGED_EVENT
  private accessToken: string | null = null
  private listeners = new Set<AuthTokenListener>()

  public getAccessToken(): string | null {
    return this.accessToken
  }

  public setAccessToken(token: string): void {
    this.accessToken = token
    this._notifyAuthTokenChanged()
  }

  public clearAccessToken(): void {
    this.accessToken = null
    this._notifyAuthTokenChanged()
  }

  public hasAccessToken(): boolean {
    return Boolean(this.getAccessToken())
  }

  public subscribe(listener: AuthTokenListener): () => void {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private _notifyAuthTokenChanged(): void {
    this.listeners.forEach((listener) => listener(this.accessToken))

    if (typeof window === "undefined") return
    window.dispatchEvent(new Event(this.tokenChangedEvent))
  }
}

export const authTokenService = new AuthTokenService()
