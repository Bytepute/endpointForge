import { createEndpoint } from "#/backend/services/endpoint.services"
import type { CreateEndpointFormValues } from "#/schemas/create-endpoint-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

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
        delayMs: values.delayMs,
        enabled: values.enabled,
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
