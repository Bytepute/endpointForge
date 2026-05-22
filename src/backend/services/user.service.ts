import { userApi } from "#/backend/api/user-api"
import type {
  CurrentUserResponseDTO,
  UpdateCurrentUserRequestDTO,
} from "#/backend/dtos/user.dto"
import type { UserModel } from "#/models/user.model"
import type { UpdateProfileInput } from "#/schemas/profile.schema"

class UserService {
  public getCurrentUser = async (): Promise<UserModel> => {
    const response = await userApi.getCurrentUser()
    return this._convertCurrentUserResponseDTOToUserModel(response)
  }

  public updateCurrentUser = async (
    input: UpdateProfileInput,
  ): Promise<UserModel> => {
    const request = this._convertUpdateProfileInputToRequestDTO(input)
    const response = await userApi.updateCurrentUser(request)
    return this._convertCurrentUserResponseDTOToUserModel(response)
  }

  public deleteCurrentUser = async (): Promise<void> => {
    await userApi.deleteCurrentUser()
  }

  private _convertUpdateProfileInputToRequestDTO(
    input: UpdateProfileInput,
  ): UpdateCurrentUserRequestDTO {
    return {
      userName: input.username,
    }
  }

  private _convertCurrentUserResponseDTOToUserModel(
    response: CurrentUserResponseDTO,
  ): UserModel {
    return {
      id: response.userId ?? response.id ?? 0,
      username: response.userName,
      createdAt: new Date(response.createdAt),
    }
  }
}

export const userService = new UserService()
