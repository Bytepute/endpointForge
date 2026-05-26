import { z } from "zod"

export const createLoginSchema = (messages: {
  usernameMin: string
  passwordMin: string
}) =>
  z.object({
    username: z.string().min(3, messages.usernameMin),
    password: z.string().min(6, messages.passwordMin),
  })

export const LoginSchema = createLoginSchema({
  usernameMin: "نام کاربری نمی‌تواند کمتر از ۳ کاراکتر باشد.",
  passwordMin: "رمز عبور نمی‌تواند کمتر از ۶ کاراکتر باشد.",
})

export type Login = z.infer<typeof LoginSchema>
