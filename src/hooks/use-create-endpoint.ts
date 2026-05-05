import { endpointService } from "#/backend/services/endpoint.services"
import type { createEndpointType } from "#/schemas/endpoint-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useCreateEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: createEndpointType) => {
      const parsedBody = JSON.parse(values.responseBody)

      return endpointService.createEndpoint({
        routeGroupId: Number(controllerId),
        method: values.method,
        path: values.path.trim(),
        statusCode: Number(values.statusCode),
        responseBody: parsedBody,
        delay: values.delay,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints", controllerId],
      })
      toast.success("Endpoint created successfully")
    },
    onError: () => {
      toast.error("Failed to create endpoint")
    },
  })
}
