import { useMutation } from "@tanstack/react-query"
import type { Register } from "#/schemas/register.schema"
import { authService } from "#/backend/services/auth.services"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"
import { notificationService } from "#/services/notification.service"

type RegisterMessages = {
  success: string
  error: string
  direction?: "ltr" | "rtl"
}

export function useRegister(messages?: RegisterMessages) {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: Register) => authService.register(data),

    onSuccess: (user) => {
      useAuthStore.getState().setAccessToken(user.session.accessToken)
      void navigate({ to: "/projects" })
      notificationService.success(
        messages?.success ?? "ثبت نام با موفقیت انجام شد",
        {
          direction: messages?.direction ?? "rtl",
        },
      )
    },

    onError: () => {
      notificationService.error(
        messages?.error ?? "خطا در ثبت نام. دوباره تلاش کنید",
        {
          direction: messages?.direction ?? "rtl",
        },
      )
    },
  })
}
