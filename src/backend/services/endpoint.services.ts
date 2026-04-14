import type {
  CreateEndpointDTO,
  EndpointDTO,
  UpdateEndpointDTO,
} from '../dtos/endpoint.dto'
import { sleep } from './shared.services'

// TODO: remove mock data
let mockEndpoints: EndpointDTO[] = [
  {
    id: 'e1',
    controllerId: '1',
    method: 'GET',
    path: '/list',
    statusCode: 200,
    responseJson: [{ id: 1, name: 'John Doe' }],
    delayMs: 120,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'e2',
    controllerId: '1',
    method: 'POST',
    path: '/create',
    statusCode: 201,
    responseJson: { success: true },
    delayMs: 250,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'e3',
    controllerId: '2',
    method: 'GET',
    path: '/today',
    statusCode: 200,
    responseJson: { temp: '20°C' },
    delayMs: 50,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
]

export async function getEndpointsByController(
  controllerId: string,
): Promise<EndpointDTO[]> {
  await sleep()
  return mockEndpoints.filter(
    (endpoint) => endpoint.controllerId === controllerId,
  )
}

export async function removeEndpoint(endpointId: string): Promise<void> {
  await sleep()

  mockEndpoints = mockEndpoints.filter((item) => item.id !== endpointId)
}

export async function createEndpoint(
  data: CreateEndpointDTO,
): Promise<EndpointDTO> {
  await sleep()

  // TODO: update after api
  const newEndpoint: EndpointDTO = {
    id: 'newId',
    controllerId: data.controllerId,
    method: data.method,
    path: data.path,
    statusCode: data.statusCode,
    responseJson: data.responseJson,
    delayMs: data.delayMs,
    enabled: data.enabled,
    createdAt: new Date().toISOString(),
  }

  mockEndpoints = [...mockEndpoints, newEndpoint]

  return newEndpoint
}

export async function updateEndpoint(
  endpointId: string,
  updates: UpdateEndpointDTO,
): Promise<EndpointDTO> {
  const index = mockEndpoints.findIndex((e) => e.id === endpointId)
  if (index === -1) throw new Error('Endpoint not found')

  const updated: EndpointDTO = {
    ...mockEndpoints[index],
    ...updates,
  }

  mockEndpoints[index] = updated

  return updated
}
