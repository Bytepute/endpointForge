import { create } from "zustand"

type AuthState = {
  accessToken: string | null
  isAuthReady: boolean
  loginModalOpen: boolean
  sessionExpired: boolean
  isLoggedIn: () => boolean
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
  setAuthReady: (ready: boolean) => void
  openLoginModal: () => void
  closeLoginModal: () => void
  markSessionExpired: () => void
  resetSessionExpired: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  isAuthReady: false,
  loginModalOpen: false,
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
  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),
  markSessionExpired: () =>
    set({
      accessToken: null,
      isAuthReady: true,
      loginModalOpen: true,
      sessionExpired: true,
    }),
  resetSessionExpired: () => set({ sessionExpired: false }),
}))
