import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().min(3, "نام کاربری نمی‌تواند کمتر از ۳ کاراکتر باشد."),
  password: z.string().min(6, "رمز عبور نمی‌تواند کمتر از ۶ کاراکتر باشد."),
})

export type Login = z.infer<typeof LoginSchema>
