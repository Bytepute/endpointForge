import { getEndpointsByController } from '#/backend/services/endpoint.services'
import { useQuery } from '@tanstack/react-query'

export function useEndpoint(controllerId: string) {
  const endpoints = useQuery({
    queryKey: ['endpoints', controllerId],
    queryFn: () => getEndpointsByController(controllerId),
    enabled: !!controllerId,
  })

  return { endpoints }
}
