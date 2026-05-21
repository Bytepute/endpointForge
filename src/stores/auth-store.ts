import { create } from "zustand"

type AuthState = {
  accessToken: string | null
  isAuthReady: boolean
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  sessionExpired: boolean
  isLoggedIn: () => boolean
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
  setAuthReady: (ready: boolean) => void
  setLoginModal: (open: boolean) => void
  setRegisterModal: (open: boolean) => void
  markSessionExpired: () => void
  resetSessionExpired: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  isAuthReady: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  sessionExpired: false,
  isLoggedIn: () => Boolean(get().accessToken),
  setAccessToken: (token) =>
    set({
      accessToken: token,
      isAuthReady: true,
      sessionExpired: false,
    }),
  clearAccessToken: () =>
    set({
      accessToken: null,
    }),
  setAuthReady: (ready) => set({ isAuthReady: ready }),
  setLoginModal: (open) => set({ isLoginModalOpen: open }),
  setRegisterModal: (open) => set({ isRegisterModalOpen: open }),
  markSessionExpired: () =>
    set({
      accessToken: null,
      isAuthReady: true,
      isLoginModalOpen: true,
      sessionExpired: true,
    }),
  resetSessionExpired: () => set({ sessionExpired: false }),
}))
