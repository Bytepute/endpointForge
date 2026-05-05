import type { EndpointModel } from "#/models/endpoint-model"
import { endpointApi } from "../api/endpoint-api"
import type {
  CreateEndpointDTO,
  EndpointDTOResponse,
  UpdateEndpointDTO,
} from "../dtos/endpoint.dto"

class EndpointService {
  public async getEndpointsByController(
    controllerId: string,
  ): Promise<EndpointModel[]> {
    const responses = await endpointApi.getEndpointByControllerId(
      Number(controllerId),
    )

    return responses.map((item) => this.convertToModel(item))
  }

  public async getEndpointById(id: string): Promise<EndpointModel> {
    const response = await endpointApi.getEndpointById(Number(id))
    return this.convertToModel(response)
  }

  public async createEndpoint(data: CreateEndpointDTO): Promise<EndpointModel> {
    const response = await endpointApi.createEndpoint(data)
    return this.convertToModel(response)
  }

  public async updateEndpoint(
    endpointId: string,
    updates: UpdateEndpointDTO,
  ): Promise<EndpointModel> {
    const response = await endpointApi.updateEndpoint(
      Number(endpointId),
      updates,
    )
    return this.convertToModel(response)
  }

  public async deleteEndpoint(endpointId: string): Promise<EndpointModel> {
    return await endpointApi.deleteEndpoint(Number(endpointId))
  }

  private convertToModel(dto: EndpointDTOResponse): EndpointModel {
    return {
      id: dto.id,
      routeGroupId: dto.routeGroupId,
      method: dto.method,
      path: dto.path,
      statusCode: dto.statusCode,
      delay: dto.delay,
      responseBody: dto.responseBody,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    }
  }
}

export const endpointService = new EndpointService()
