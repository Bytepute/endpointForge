import type {
  CreateEndpointDTO,
  EndpointDTOResponse,
  UpdateEndpointDTO,
} from "../dtos/endpoint.dto"
import { baseApi } from "./base-api"

class EndpointApi {
  private basePath = "/endpoints"

  public async getEndpointById(id: number): Promise<EndpointDTOResponse> {
    return baseApi.get(`${this.basePath}/${id}`)
  }

  public async getEndpointByControllerId(
    id: number,
  ): Promise<EndpointDTOResponse[]> {
    return baseApi.get(`${this.basePath}/route-group/${id}`)
  }

  public async createEndpoint(
    data: CreateEndpointDTO,
  ): Promise<EndpointDTOResponse> {
    return baseApi.post(this.basePath, data)
  }

  public deleteEndpoint(id: number): Promise<EndpointDTOResponse> {
    return baseApi.delete(`${this.basePath}/${id}`)
  }

  public updateEndpoint(
    id: number,
    updates: UpdateEndpointDTO,
  ): Promise<EndpointDTOResponse> {
    return baseApi.patch(`${this.basePath}/${id}`, updates)
  }
}

export const endpointApi = new EndpointApi()
