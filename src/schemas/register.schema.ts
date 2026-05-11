import { z } from "zod"

export const RegisterSchema = z
  .object({
    username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد").max(32),

    email: z.string().email("ایمیل معتبر نیست"),

    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  })

export type Register = z.infer<typeof RegisterSchema>
