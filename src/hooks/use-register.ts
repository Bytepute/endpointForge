import { useMutation } from "@tanstack/react-query"
import type { Register } from "#/schemas/register.schema"
import { toast } from "sonner"
import { authApi } from "#/backend/api/auth-api"
import { authTokenService } from "#/backend/services/auth-token.service"

export function useRegister() {
  return useMutation({
    mutationFn: async (data: Register) =>
      authApi.register({
        userName: data.username,
        password: data.password,
      }),

    onSuccess: (data) => {
      authTokenService.setAccessToken(data.accessToken)
      toast.success("ثبت نام با موفقیت انجام شد")
    },

    onError: () => {
      toast.error("خطا در ثبت نام. دوباره تلاش کنید")
    },
  })
}
