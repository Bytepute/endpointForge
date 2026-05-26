import { z } from "zod"

export const createRegisterSchema = (messages: {
  usernameMin: string
  invalidEmail: string
  passwordMin: string
  passwordMismatch: string
}) =>
  z
    .object({
      username: z.string().min(3, messages.usernameMin).max(32),

      email: z.string().email(messages.invalidEmail),

      password: z.string().min(6, messages.passwordMin),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.passwordMismatch,
      path: ["confirmPassword"],
    })

export const RegisterSchema = createRegisterSchema({
  usernameMin: "نام کاربری باید حداقل ۳ کاراکتر باشد",
  invalidEmail: "ایمیل معتبر نیست",
  passwordMin: "رمز عبور باید حداقل ۶ کاراکتر باشد",
  passwordMismatch: "رمز عبور مطابقت ندارد",
})

export type Register = z.infer<typeof RegisterSchema>
