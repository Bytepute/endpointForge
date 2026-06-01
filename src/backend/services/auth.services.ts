import { authApi } from "#/backend/api/auth-api"
import type {
  LoginRequestDTO,
  LoginResponseDTO,
} from "#/backend/dtos/login.dto"
import type {
  RegisterRequestDTO,
  RegisterResponseDTO,
} from "#/backend/dtos/register.dto"
import type { Login } from "#/schemas/login.schema"
import type { Register } from "#/schemas/register.schema"
import type { AuthSessionModel, RegisteredUserModel } from "#/models/auth.model"

class AuthService {
  public async login(input: Login): Promise<AuthSessionModel> {
    const request = this._convertLoginInputToLoginRequestDTO(input)
    const response = await authApi.login(request)
    return this._convertLoginResponseDTOToAuthSessionModel(response)
  }

  public async register(input: Register): Promise<RegisteredUserModel> {
    const request = this._convertRegisterInputToRegisterRequestDTO(input)
    const response = await authApi.register(request)
    return this._convertRegisterResponseDTOToRegisteredUserModel(response)
  }

  private _convertLoginInputToLoginRequestDTO(input: Login): LoginRequestDTO {
    return {
      userName: input.username,
      password: input.password,
    }
  }

  private _convertRegisterInputToRegisterRequestDTO(
    input: Register,
  ): RegisterRequestDTO {
    return {
      userName: input.username,
      password: input.password,
    }
  }

  private _convertLoginResponseDTOToAuthSessionModel(
    dto: LoginResponseDTO,
  ): AuthSessionModel {
    return {
      username: dto.username,
      accessToken: dto.accessToken,
      expiresIn: dto.expiresIn,
      tokenType: dto.tokenType,
    }
  }

  private _convertRegisterResponseDTOToRegisteredUserModel(
    dto: RegisterResponseDTO,
  ): RegisteredUserModel {
    return {
      id: dto.userId,
      username: dto.userName,
      createdAt: new Date(dto.createdAt),
      session: {
        username: dto.userName,
        accessToken: dto.accessToken,
        expiresIn: dto.expiresIn,
        tokenType: "Bearer",
      },
    }
  }
}

export const authService = new AuthService()
