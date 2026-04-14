import { z } from 'zod'

export const createEndpointSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  path: z.string().min(1, 'Path is required'),
  statusCode: z.string().refine((v) => !isNaN(Number(v)), 'Must be a number'),
  responseJson: z.string().refine((v) => {
    try {
      JSON.parse(v)
      return true
    } catch {
      return false
    }
  }, 'Invalid JSON'),
  delayMs: z.number(),
  enabled: z.boolean(),
})

export type CreateEndpointFormValues = z.infer<typeof createEndpointSchema>
