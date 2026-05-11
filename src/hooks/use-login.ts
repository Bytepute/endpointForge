import { useMutation } from "@tanstack/react-query"
import type { Login } from "#/schemas/login.schema"
import { toast } from "sonner"
// TODO: replace with real service after API
export function useLogin() {
  return useMutation({
    mutationFn: async (data: Login) => console.log(data),
    onSuccess: () => {
      toast.success("با موفقیت وارد شدید")
    },
    onError: () => {
      toast.error("خطا در ورود. دوباره تلاش کنید")
    },
  })
}
