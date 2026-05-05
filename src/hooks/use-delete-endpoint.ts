import { endpointService } from "#/backend/services/endpoint.services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (endpointId: string) =>
      endpointService.deleteEndpoint(endpointId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints", controllerId],
      })
      toast.success("Endpoint deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete endpoint")
    },
  })
}
