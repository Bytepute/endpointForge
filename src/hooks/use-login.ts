import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { toast } from "sonner"
import { authService } from "#/backend/services/auth.services"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: Login) => authService.login(data),
    onSuccess: (session) => {
      useAuthStore.getState().setAccessToken(session.accessToken)
      useAuthStore.getState().setLoginModal(false)
      void navigate({ to: "/projects" })
      toast.success("با موفقیت وارد شدید")
    },
    onError: () => {
      notificationService.error("خطا در ورود. دوباره تلاش کنید", {
        direction: "rtl",
      })
    },
  })
}
