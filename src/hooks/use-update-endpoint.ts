import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateEndpointDTO } from "#/backend/dtos/endpoint.dto"
import { toast } from "sonner"
import { endpointService } from "#/backend/services/endpoint.services"

export function useUpdateEndpoint(endpointId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: UpdateEndpointDTO) =>
      endpointService.updateEndpoint(endpointId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints"],
      })
      toast.success("Endpoint updated successfully")
    },
    onError: () => {
      toast.error("Failed to updated endpoint")
    },
  })
}
