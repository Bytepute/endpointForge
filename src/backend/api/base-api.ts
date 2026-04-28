import axios from "axios"
import type { AxiosInstance } from "axios"

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.instance.interceptors.response.use(
      (res) => res,
      (error) => Promise.reject(error),
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
  ): Promise<TResponse> {
    const res = await this.instance.post<TResponse>(url, body)
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
