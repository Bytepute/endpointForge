import z from "zod"

export const CreateControllerSchema = z.object({
  path: z
    .string()
    .min(1, "Path is required")
    .refine((val) => val.startsWith("/"), {
      message: "Path must start with /",
    }),
})

export type CreateController = z.infer<typeof CreateControllerSchema>
