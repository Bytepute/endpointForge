import type {
  CreateProjectRequestDTO,
  CreateProjectResponseDTO,
  DeleteProjectResponseDTO,
  PatchProjectRequestDTO,
  PatchProjectResponseDTO,
  ProjectMockServerResponseDTO,
  ProjectResponseDTO,
} from "../dtos/project.dto"
import { baseApi } from "./base-api"

class ProjectApi {
  private basePath = "/projects"

  public async createProject(
    body: CreateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    return baseApi.post(this.basePath, body)
  }

  public async getProjects(): Promise<ProjectResponseDTO[]> {
    return baseApi.get(this.basePath)
  }

  public async getProject(id: number): Promise<CreateProjectResponseDTO> {
    return baseApi.get(`${this.basePath}/${id}`)
  }

  public async patchProject(
    id: number,
    body: PatchProjectRequestDTO,
  ): Promise<PatchProjectResponseDTO> {
    return baseApi.patch(`${this.basePath}/${id}`, body)
  }

  public async deleteProject(id: number): Promise<DeleteProjectResponseDTO> {
    return baseApi.delete(`${this.basePath}/${id}`)
  }

  public async startProject(id: number): Promise<ProjectMockServerResponseDTO> {
    return baseApi.post(`/mock/start/${id}`)
  }
  public async stopProject(id: number): Promise<ProjectMockServerResponseDTO> {
    return baseApi.post(`/mock/stop/${id}`)
  }
}
export const projectApi = new ProjectApi()
