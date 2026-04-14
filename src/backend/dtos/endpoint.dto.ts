// TODO: review after api
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type EndpointDTO = {
  id: string
  controllerId: string
  method: HttpMethod
  path: string
  statusCode: number
  responseJson: unknown
  delayMs: number
  enabled: boolean
  createdAt: string
}

export type CreateEndpointDTO = {
  controllerId: string
  method: HttpMethod
  path: string
  statusCode: number
  responseJson: unknown
  delayMs: number
  enabled: boolean
}

export type UpdateEndpointDTO = Partial<{
  method: HttpMethod
  path: string
  statusCode: number
  responseJson: unknown
  delayMs: number
  enabled: boolean
}>
