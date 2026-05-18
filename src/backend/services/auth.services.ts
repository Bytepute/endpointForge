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
import { authTokenService } from "./auth-token.service"

class AuthService {
  public async login(input: Login): Promise<AuthSessionModel> {
    const request = this._convertLoginInputToLoginRequestDTO(input)
    const response = await authApi.login(request)
    const session = this._convertLoginResponseDTOToAuthSessionModel(response)

    authTokenService.setAccessToken(session.accessToken)

    return session
  }

  public async register(input: Register): Promise<RegisteredUserModel> {
    const request = this._convertRegisterInputToRegisterRequestDTO(input)
    const response = await authApi.register(request)
    const user = this._convertRegisterResponseDTOToRegisteredUserModel(response)

    authTokenService.setAccessToken(user.session.accessToken)

    return user
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
        accessToken: dto.accessToken,
        expiresIn: dto.expiresIn,
        tokenType: "Bearer",
      },
    }
  }
}

export const authService = new AuthService()
