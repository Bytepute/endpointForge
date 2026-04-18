import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateEndpointDTO } from "#/backend/dtos/endpoint.dto"
import { updateEndpoint } from "#/backend/services/endpoint.services"
import { toast } from "sonner"

export function useUpdateEndpoint(endpointId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: UpdateEndpointDTO) =>
      updateEndpoint(endpointId, updates),

    onSuccess: (_, __) => {
      queryClient.invalidateQueries()
      toast.success("Endpoint updated successfully")
    },
    onError: () => {
      toast.error("Failed to updated endpoint")
    },
  })
}
