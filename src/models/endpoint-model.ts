import type { HttpMethod } from "#/backend/dtos/endpoint.dto"

export type EndpointModel = {
  id: number
  routeGroupId: number
  method: HttpMethod
  path: string
  statusCode: number
  delay: number
  responseBody: unknown
  createdAt: string
  updatedAt: string
  endpointFullUrl: string
}
