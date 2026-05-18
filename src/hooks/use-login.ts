import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { toast } from "sonner"
import { authApi } from "#/backend/api/auth-api"
import { authTokenService } from "#/backend/services/auth-token.service"

export function useLogin() {
  return useMutation({
    mutationFn: async (data: Login) =>
      authApi.login({
        userName: data.username,
        password: data.password,
      }),
    onSuccess: (data) => {
      authTokenService.setAccessToken(data.accessToken)
      toast.success("با موفقیت وارد شدید")
    },
    onError: () => {
      toast.error("خطا در ورود. دوباره تلاش کنید")
    },
  })
}
