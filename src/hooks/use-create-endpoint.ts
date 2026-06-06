import { endpointService } from "#/backend/services/endpoint.services"
import type { CreateEndpointType } from "#/schemas/endpoint-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useCreateEndpoint(controllerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: CreateEndpointType) => {
      const parsedBody = JSON.parse(values.responseBody)

      return endpointService.createEndpoint({
        routeGroupId: Number(controllerId),
        method: values.method,
        path: values.path,
        statusCode: Number(values.statusCode),
        responseBody: parsedBody,
        delay: values.delay,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["endpoints", controllerId],
      })
      notificationService.success("Endpoint created successfully")
    },
    onError: () => {
      notificationService.error("Failed to create endpoint")
    },
  })
}
