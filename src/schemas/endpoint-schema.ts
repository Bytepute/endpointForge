import { z } from "zod"

export const createEndpointSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  path: z
    .string()
    .regex(
      /^\/[a-zA-Z0-9\-]+$/,
      "Path must start with '/' and contain only letters, numbers, and hyphens (e.g., /slug1234-name).",
    ),

  statusCode: z.string().refine((v) => !isNaN(Number(v)), "Must be a number"),
  responseBody: z.string().refine((v) => {
    try {
      JSON.parse(v)
      return true
    } catch {
      return false
    }
  }, "Invalid JSON"),
  delay: z.number(),
})

export type CreateEndpointType = z.infer<typeof createEndpointSchema>
export type UpdateEndpointType = z.infer<typeof createEndpointSchema>
