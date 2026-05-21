import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { notificationService } from "#/services/notification.service.ts"

// TODO: replace with real service after API
export function useLogin() {
  return useMutation({
    mutationFn: async (data: Login) => console.log(data),
    onSuccess: () => {
      notificationService.success("با موفقیت وارد شدید", { direction: "rtl" })
    },
    onError: () => {
      notificationService.error("خطا در ورود. دوباره تلاش کنید", {
        direction: "rtl",
      })
    },
  })
}
