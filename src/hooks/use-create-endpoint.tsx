import { createEndpoint } from '#/backend/services/endpoint.services'
import type { CreateEndpointFormValues } from '#/schemas/create-endpoint-schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: CreateEndpointFormValues) => {
      const parsedJson = JSON.parse(values.responseJson)

      return createEndpoint({
        controllerId,
        method: values.method,
        path: values.path.trim(),
        statusCode: Number(values.statusCode),
        responseJson: parsedJson,
        delayMs: values.delayMs ?? 0,
        enabled: values.enabled ?? true,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['endpoints', controllerId],
      })
    },
  })
}
