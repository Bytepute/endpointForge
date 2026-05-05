export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type EndpointDTOResponse = {
  id: number
  routeGroupId: number
  method: HttpMethod
  path: string
  statusCode: number
  delay: number
  responseBody: unknown
  createdAt: string
  updatedAt: string
}

export type CreateEndpointDTO = {
  routeGroupId: number
  method: HttpMethod
  path: string
  statusCode: number
  delay: number
  responseBody: unknown
}

export type UpdateEndpointDTO = Partial<{
  method: HttpMethod
  path: string
  statusCode: number
  delay: number
  responseBody: unknown
}>
