import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { toast } from "sonner"
import { authService } from "#/backend/services/auth.services"

export function useLogin() {
  return useMutation({
    mutationFn: async (data: Login) => authService.login(data),
    onSuccess: () => {
      toast.success("با موفقیت وارد شدید")
    },
    onError: () => {
      toast.error("خطا در ورود. دوباره تلاش کنید")
    },
  })
}
