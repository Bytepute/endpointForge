import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateEndpointDTO } from "#/backend/dtos/endpoint.dto"
import { endpointService } from "#/backend/services/endpoint.services"
import { notificationService } from "#/services/notification.service.ts"

export function useUpdateEndpoint(endpointId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: UpdateEndpointDTO) =>
      endpointService.updateEndpoint(endpointId, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints"],
      })
      notificationService.success("Endpoint updated successfully", {
        direction: "rtl",
      })
    },
    onError: () => {
      notificationService.error("Failed to updated endpoint", {
        direction: "rtl",
      })
    },
  })
}
