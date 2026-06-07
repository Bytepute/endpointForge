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

    return responses.map((item) =>
      this.convertEndpointDTOResponseToEndpointModel(item),
    )
  }

  public async getEndpointById(id: string): Promise<EndpointModel> {
    const response = await endpointApi.getEndpointById(Number(id))
    return this.convertEndpointDTOResponseToEndpointModel(response)
  }

  public async createEndpoint(data: CreateEndpointDTO): Promise<EndpointModel> {
    const sanitizedData = {
      ...data,
      path: data.path.startsWith("/") ? data.path.slice(1) : data.path,
    }
    const response = await endpointApi.createEndpoint(sanitizedData)
    return this.convertEndpointDTOResponseToEndpointModel(response)
  }

  public async updateEndpoint(
    endpointId: string,
    updates: UpdateEndpointDTO,
  ): Promise<EndpointModel> {
    const sanitizedUpdates = {
      ...updates,
      path: updates.path?.startsWith("/")
        ? updates.path.slice(1)
        : updates.path,
    }
    const response = await endpointApi.updateEndpoint(
      Number(endpointId),
      sanitizedUpdates,
    )
    return this.convertEndpointDTOResponseToEndpointModel(response)
  }

  public async deleteEndpoint(endpointId: string): Promise<EndpointModel> {
    return await endpointApi.deleteEndpoint(Number(endpointId))
  }

  private convertEndpointDTOResponseToEndpointModel(
    dto: EndpointDTOResponse,
  ): EndpointModel {
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
      endpointFullUrl: dto.endpointFullUrl,
    }
  }
}

export const endpointService = new EndpointService()
