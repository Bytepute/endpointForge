import { z } from "zod"

export const createRegisterSchema = (messages: {
  usernameMin: string
  passwordMin: string
}) =>
  z.object({
    username: z.string().min(3, messages.usernameMin).max(32),

    password: z.string().min(6, messages.passwordMin),
  })

export const RegisterSchema = createRegisterSchema({
  usernameMin: "نام کاربری باید حداقل ۳ کاراکتر باشد",
  passwordMin: "رمز عبور باید حداقل ۶ کاراکتر باشد",
})

export type Register = z.infer<typeof RegisterSchema>
