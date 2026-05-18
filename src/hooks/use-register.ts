import { useMutation } from "@tanstack/react-query"
import type { Register } from "#/schemas/register.schema"
import { toast } from "sonner"
import { authService } from "#/backend/services/auth.services"

export function useRegister() {
  return useMutation({
    mutationFn: async (data: Register) => authService.register(data),

    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد")
    },

    onError: () => {
      toast.error("خطا در ثبت نام. دوباره تلاش کنید")
    },
  })
}
