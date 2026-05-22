import type {
  RegisterRequestDTO,
  RegisterResponseDTO,
} from "#/backend/dtos/register.dto"
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  TokenPairResponseDTO,
} from "#/backend/dtos/login.dto"
import { baseApi } from "./base-api"

class AuthApi {
  private basePath = "/auth"

  public async register(
    body: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return baseApi.post(`${this.basePath}/register`, body, {
      withCredentials: true,
    })
  }

  public async login(body: LoginRequestDTO): Promise<LoginResponseDTO> {
    return baseApi.post(`${this.basePath}/login`, body, {
      withCredentials: true,
    })
  }

  public async refreshToken(): Promise<TokenPairResponseDTO> {
    return baseApi.post(`${this.basePath}/refresh-token`, undefined, {
      withCredentials: true,
    })
  }

  public async logout(): Promise<void> {
    return baseApi.post(`${this.basePath}/logout`, undefined, {
      withCredentials: true,
    })
  }
}

export const authApi = new AuthApi()
