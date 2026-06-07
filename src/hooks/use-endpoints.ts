import { endpointService } from "#/backend/services/endpoint.services"
import { useQuery } from "@tanstack/react-query"

export function useEndpoints(controllerId: string) {
  return useQuery({
    queryKey: ["endpoints", controllerId],
    queryFn: () => endpointService.getEndpointsByController(controllerId),
    enabled: !!controllerId,
  })
}
export function useEndpoint(endpointId: string) {
  return useQuery({
    queryKey: ["endpoint", endpointId],
    queryFn: () => endpointService.getEndpointById(endpointId),
    enabled: !!endpointId,
  })
}
