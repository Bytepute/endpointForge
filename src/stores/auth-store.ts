import { create } from "zustand"

type AuthState = {
  accessToken: string | null
  username: string | null
  isAuthReady: boolean
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  sessionExpired: boolean
  sessionEndedIntentionally: boolean

  isLoggedIn: () => boolean

  setAccessToken: (token: string) => void
  clearAccessToken: () => void
  endSessionIntentionally: () => void

  setAuthReady: (ready: boolean) => void

  setLoginModal: (open: boolean) => void
  setRegisterModal: (open: boolean) => void

  markSessionExpired: () => void
  resetSessionExpired: () => void

  setUsername: (username: string | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  username: null,

  isAuthReady: false,

  isLoginModalOpen: false,
  isRegisterModalOpen: false,

  sessionExpired: false,
  sessionEndedIntentionally: false,

  isLoggedIn: () => Boolean(get().accessToken),

  setAccessToken: (token) =>
    set({
      accessToken: token,
      sessionExpired: false,
      sessionEndedIntentionally: false,
    }),

  clearAccessToken: () =>
    set({
      accessToken: null,
      username: null,
    }),

  endSessionIntentionally: () =>
    set({
      accessToken: null,
      username: null,

      isAuthReady: true,

      isLoginModalOpen: false,

      sessionExpired: false,
      sessionEndedIntentionally: true,
    }),

  setAuthReady: (ready) =>
    set({
      isAuthReady: ready,
    }),

  setLoginModal: (open) =>
    set({
      isLoginModalOpen: open,
    }),

  setRegisterModal: (open) =>
    set({
      isRegisterModalOpen: open,
    }),

  markSessionExpired: () => {
    if (get().sessionEndedIntentionally) {
      return
    }

    set({
      accessToken: null,
      username: null,

      isAuthReady: true,

      isLoginModalOpen: true,
      sessionExpired: true,
    })
  },

  resetSessionExpired: () =>
    set({
      sessionExpired: false,
    }),

  setUsername: (username) =>
    set({
      username,
    }),
}))
