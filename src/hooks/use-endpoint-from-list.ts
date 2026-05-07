import { useEndpoints } from "#/hooks/use-endpoints"
import type { EndpointModel } from "#/models/endpoint-model"

export function useEndpointFromList(controllerId: string, endpointId: string) {
  const { data: endpoints, isLoading, error } = useEndpoints(controllerId)
  const endpoint = endpoints?.find(
    (e: EndpointModel) => String(e.id) === endpointId,
  )
  return { endpoint, isLoading, error }
}
