// TODO: review after api

export type ControllerDTO = {
  id: string
  projectId: string
  name: string
  basePath: string
  createdAt: string
  endpoints: string[]
}

export type CreateRouteGroupRequestDto = {
  projectId: number
  name?: string
  description?: string
  prefix: string
}

export type RouteGroupResponseDto = {
  id: number
  projectId: number
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  prefix: string
}

export type UpdateRouteGroupRequestDto = {
  projectId: number
  name?: string
  description?: string
  prefix: string
}
