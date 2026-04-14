import { removeEndpoint } from '#/backend/services/endpoint.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (endpointId: string) => removeEndpoint(endpointId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['endpoints', controllerId],
      })
    },
  })
}
