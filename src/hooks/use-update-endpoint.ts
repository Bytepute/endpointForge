import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateEndpointDTO } from '#/backend/dtos/endpoint.dto'
import { updateEndpoint } from '#/backend/services/endpoint.services'

export function useUpdateEndpoint(endpointId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: UpdateEndpointDTO) =>
      updateEndpoint(endpointId, updates),

    onSuccess: (_, __) => {
      queryClient.invalidateQueries()
    },
  })
}
