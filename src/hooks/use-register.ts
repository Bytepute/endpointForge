import { useMutation } from "@tanstack/react-query"
import type { Register } from "#/schemas/register.schema"
import { toast } from "sonner"
import { authService } from "#/backend/services/auth.services"
import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "#/stores/auth-store"

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: Register) => authService.register(data),

    onSuccess: (user) => {
      useAuthStore.getState().setAccessToken(user.session.accessToken)
      void navigate({ to: "/projects" })
      toast.success("ثبت نام با موفقیت انجام شد")
    },

    onError: () => {
      notificationService.error("خطا در ثبت نام. دوباره تلاش کنید", {
        direction: "rtl",
      })
    },
  })
}
