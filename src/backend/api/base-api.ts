import axios from "axios"
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios"
import { authTokenService } from "#/backend/services/auth-token.service"
import type { TokenPairResponseDTO } from "#/backend/dtos/login.dto"

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 8000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.instance.interceptors.request.use((config) => {
      const token = authTokenService.getAccessToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    this.instance.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        const originalRequest = error.config as
          | RetryableRequestConfig
          | undefined

        if (!this.canRefreshToken(error, originalRequest)) {
          return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
          const res = await this.instance.post<TokenPairResponseDTO>(
            "/auth/refresh-token",
            undefined,
            { withCredentials: true },
          )

          authTokenService.setAccessToken(res.data.accessToken)
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`

          return this.instance(originalRequest)
        } catch (refreshError) {
          authTokenService.clearAccessToken()
          return Promise.reject(refreshError)
        }
      },
    )
  }

  private canRefreshToken(
    error: AxiosError,
    request?: RetryableRequestConfig,
  ): request is RetryableRequestConfig {
    if (error.response?.status !== 401 || !request || request._retry) {
      return false
    }

    const url = request.url ?? ""
    return !["/auth/login", "/auth/register", "/auth/refresh-token"].some(
      (authUrl) => url.includes(authUrl),
    )
  }

  async get<TResponse, TParams = unknown>(
    url: string,
    params?: TParams,
  ): Promise<TResponse> {
    const res = await this.instance.get<TResponse>(url, { params })
    return res.data
  }

  async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const res = await this.instance.post<TResponse>(url, body, config)
    return res.data
  }

  async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
  ): Promise<TResponse> {
    const res = await this.instance.patch<TResponse>(url, body)
    return res.data
  }

  async delete<TResponse>(url: string): Promise<TResponse> {
    const res = await this.instance.delete<TResponse>(url)
    return res.data
  }
}

export const baseApi = new ApiClient()
