import { z } from "zod"

export const UpdateProfileInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username must be at most 15 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, and _ only."),
})

export type UpdateProfileInput = z.infer<typeof UpdateProfileInputSchema>
