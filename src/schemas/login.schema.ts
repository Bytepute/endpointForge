import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().min(1, "نام کاربری را وارد کنید."),
  password: z.string().min(1, "رمز عبور را وارد کنید."),
})

export type Login = z.infer<typeof LoginSchema>
