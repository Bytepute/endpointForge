import z from "zod"

export const CreateControllerSchema = z.object({
  path: z
    .string()
    .regex(
      /^\/[a-zA-Z0-9\-]+$/,
      "Path must start with '/' and contain only letters, numbers, and hyphens (e.g., /slug1234-name).",
    ),
})

export type CreateController = z.infer<typeof CreateControllerSchema>
