import axios from "axios"
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios"

import type { TokenPairResponseDTO } from "#/backend/dtos/login.dto"
import { useAuthStore } from "#/stores/auth-store"

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

class ApiClient {
  private instance: AxiosInstance

  // prevents parallel refresh requests
  private refreshPromise: Promise<string> | null = null

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 8000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // attach access token to every request
    this.instance.interceptors.request.use((config) => {
      const token = useAuthStore.getState().accessToken

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    // refresh token flow
    this.instance.interceptors.response.use(
      (response) => response,

      async (error: AxiosError) => {
        const originalRequest = error.config as
          | RetryableRequestConfig
          | undefined

        if (!this.canRefreshToken(error, originalRequest)) {
          return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
          // only ONE refresh request at a time
          if (!this.refreshPromise) {
            this.refreshPromise = this.refreshAccessToken()
          }

          const newAccessToken = await this.refreshPromise

          // reset lock
          this.refreshPromise = null

          // retry failed request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return this.instance(originalRequest)
        } catch (refreshError) {
          this.refreshPromise = null

          useAuthStore.getState().markSessionExpired()

          return Promise.reject(refreshError)
        }
      },
    )
  }

  private async refreshAccessToken(): Promise<string> {
    const res = await this.instance.post<TokenPairResponseDTO>(
      "/auth/refresh-token",
    )

    useAuthStore.getState().setAccessToken(res.data.accessToken)

    useAuthStore.getState().setUsername(res.data.username)

    return res.data.accessToken
  }

  private canRefreshToken(
    error: AxiosError,
    request?: RetryableRequestConfig,
  ): request is RetryableRequestConfig {
    if (error.response?.status !== 401 || !request || request._retry) {
      return false
    }

    const url = request.url ?? ""

    return ![
      "/auth/login",
      "/auth/logout",
      "/auth/register",
      "/auth/refresh-token",
    ].some((authUrl) => url.includes(authUrl))
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
