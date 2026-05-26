import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { authService } from "#/backend/services/auth.services"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"
import { notificationService } from "#/services/notification.service"

type LoginMessages = {
  success: string
  error: string
  direction?: "ltr" | "rtl"
}

export function useLogin(messages?: LoginMessages) {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: Login) => authService.login(data),
    onSuccess: (session) => {
      useAuthStore.getState().setAccessToken(session.accessToken)
      useAuthStore.getState().setLoginModal(false)
      void navigate({ to: "/projects" })

      notificationService.success(messages?.success ?? "با موفقیت وارد شدید", {
        direction: messages?.direction ?? "rtl",
      })
    },
    onError: () => {
      notificationService.error(
        messages?.error ?? "خطا در ورود. دوباره تلاش کنید",
        {
          direction: messages?.direction ?? "rtl",
        },
      )
    },
  })
}
