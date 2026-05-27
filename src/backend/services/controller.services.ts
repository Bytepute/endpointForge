import type { CreateController } from "#/schemas/create-controller-schema"
import type {
  CreateRouteGroupRequestDto,
  RouteGroupResponseDto,
  UpdateRouteGroupRequestDto,
} from "#/backend/dtos/controller.dto"

import type { ControllerModel } from "#/models/controller.model"
import { controllerApi } from "../api/controller-api"

class ControllerService {
  // region Requests

  public async getControllersByProjectById(
    projectId: number,
  ): Promise<ControllerModel[]> {
    const response = await controllerApi.getAllControllersByProjectId(projectId)

    return response.map((r) =>
      this._convertRouteGroupResponseDtoToControllerModel(r),
    )
  }

  public async getControllerById(id: number): Promise<ControllerModel> {
    const response = await controllerApi.getControllersById(id)

    return this._convertRouteGroupResponseDtoToControllerModel(response)
  }

  public async createController(
    body: CreateController,
    projectId: number,
  ): Promise<ControllerModel> {
    const request =
      this._convertCreateControllerInputToCreateRouteGroupRequestDto(
        body,
        projectId,
      )

    const response = await controllerApi.createController(request)

    return this._convertRouteGroupResponseDtoToControllerModel(response)
  }

  public async updateController(
    id: number,
    projectId: number,
    body: CreateController,
  ): Promise<ControllerModel> {
    const request =
      this._convertCreateControllerInputToUpdateRouteGroupRequestDto(
        body,
        projectId,
      )

    const response = await controllerApi.patchController(id, request)

    return this._convertRouteGroupResponseDtoToControllerModel(response)
  }

  public async deleteController(id: number): Promise<ControllerModel> {
    const response = await controllerApi.deleteController(id)

    return this._convertRouteGroupResponseDtoToControllerModel(response)
  }

  // endregion

  // region Converters

  private _convertCreateControllerInputToCreateRouteGroupRequestDto(
    input: CreateController,
    projectId: number,
  ): CreateRouteGroupRequestDto {
    return {
      projectId: projectId,
      name: undefined,
      description: undefined,
      prefix: input.path,
    }
  }

  private _convertCreateControllerInputToUpdateRouteGroupRequestDto(
    input: CreateController,
    projectId: number,
  ): UpdateRouteGroupRequestDto {
    return {
      projectId: projectId,
      name: undefined,
      description: undefined,
      prefix: input.path,
    }
  }

  private _convertRouteGroupResponseDtoToControllerModel(
    dto: RouteGroupResponseDto,
  ): ControllerModel {
    return {
      id: dto.id.toString(),
      projectId: dto.projectId.toString(),
      name: dto.name,
      basePath: dto.prefix,
      createdAt: dto.createdAt.toString(),
      // TODO should add in backend
      endpoints: [],
    }
  }

  // endregion
}

export const controllerService = new ControllerService()
