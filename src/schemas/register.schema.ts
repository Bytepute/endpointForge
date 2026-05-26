import { z } from "zod"

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(15, "نام کاربری باید حداکثر ۱۵ کاراکتر باشد")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد",
    ),

  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
})

export type Register = z.infer<typeof RegisterSchema>
