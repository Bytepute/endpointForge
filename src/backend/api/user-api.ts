import type {
  CurrentUserResponseDTO,
  UpdateCurrentUserRequestDTO,
} from "#/backend/dtos/user.dto"
import { baseApi } from "./base-api"

class UserApi {
  private basePath = "/users"

  public async getCurrentUser(): Promise<CurrentUserResponseDTO> {
    return baseApi.get(`${this.basePath}/me`)
  }

  public async updateCurrentUser(
    body: UpdateCurrentUserRequestDTO,
  ): Promise<CurrentUserResponseDTO> {
    return baseApi.patch(`${this.basePath}/me`, body)
  }

  public async deleteCurrentUser(): Promise<void> {
    return baseApi.delete(`${this.basePath}/me`)
  }
}

export const userApi = new UserApi()
