import { endpointService } from "#/backend/services/endpoint.services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useDeleteEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (endpointId: string) =>
      endpointService.deleteEndpoint(endpointId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints", controllerId],
      })
      notificationService.success("Endpoint deleted successfully")
    },
    onError: () => {
      notificationService.error("Failed to delete endpoint")
    },
  })
}
