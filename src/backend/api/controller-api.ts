import { baseApi } from "./base-api"
import type {
  CreateRouteGroupRequestDto,
  RouteGroupResponseDto,
  UpdateRouteGroupRequestDto,
} from "#/backend/dtos/controller.dto.ts"

class ControllerApi {
  private basePath = "/route-groups"

  public async createController(
    body: CreateRouteGroupRequestDto,
  ): Promise<RouteGroupResponseDto> {
    return baseApi.post(this.basePath, body)
  }

  public async getAllControllersByProjectId(
    id: number,
  ): Promise<RouteGroupResponseDto[]> {
    return baseApi.get(`${this.basePath}/project/${id}`)
  }

  public async getControllersById(id: number): Promise<RouteGroupResponseDto> {
    return baseApi.get(`${this.basePath}/${id}`)
  }

  public async patchController(
    id: number,
    body: UpdateRouteGroupRequestDto,
  ): Promise<RouteGroupResponseDto> {
    return baseApi.patch(`${this.basePath}/${id}`, body)
  }

  public async deleteController(id: number): Promise<RouteGroupResponseDto> {
    return baseApi.delete(`${this.basePath}/${id}`)
  }
}
export const controllerApi = new ControllerApi()
