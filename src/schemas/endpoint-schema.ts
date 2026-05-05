import { z } from "zod"

export const createEndpointSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  path: z
    .string()
    .min(1, "Path is required")
    .startsWith("/", "Path must start with /"),

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
