import { useMutation } from "@tanstack/react-query"
import type { Register } from "#/schemas/register.schema"
import { notificationService } from "#/services/notification.service.ts"

// TODO: replace with real service after API
export function useRegister() {
  return useMutation({
    mutationFn: async (data: Register) => console.log(data),

    onSuccess: () => {
      notificationService.success("ثبت نام با موفقیت انجام شد", {
        direction: "rtl",
      })
    },

    onError: () => {
      notificationService.error("خطا در ثبت نام. دوباره تلاش کنید", {
        direction: "rtl",
      })
    },
  })
}
