import type {
  CreateProjectInput,
  ProjectMockServerStatus,
  ProjectModel,
} from "#/schemas/projects.schema"
import { projectApi } from "../api/project-api"
import type {
  CreateProjectRequestDTO,
  DeleteProjectResponseDTO,
  PatchProjectRequestDTO,
  ProjectMockServerResponseDTO,
  ProjectResponseDTO,
  Status,
} from "../dtos/project.dto"

class ProjectService {
  //region Request Methods

  public createProject = async (
    body: CreateProjectInput,
  ): Promise<ProjectModel> => {
    const requestBody: CreateProjectRequestDTO =
      this._convertCreateProjectInputToCreateProjectRequestDTO(body)

    const response: ProjectResponseDTO =
      await projectApi.createProject(requestBody)
    return this._convertProjectResponseDTOToProjectModel(response)
  }

  public getAllProjects = async (): Promise<ProjectModel[]> => {
    const response: ProjectResponseDTO[] = await projectApi.getProjects()
    return response.map((r) => this._convertProjectResponseDTOToProjectModel(r))
  }

  public getProjectById = async (id: number): Promise<ProjectModel> => {
    const response: ProjectResponseDTO = await projectApi.getProject(id)
    return this._convertProjectResponseDTOToProjectModel(response)
  }

  public patchProjectById = async (
    id: number,
    body: CreateProjectInput,
  ): Promise<ProjectModel> => {
    const request: PatchProjectRequestDTO =
      this._convertCreateProjectInputToPatchProjectRequestDTO(body)

    const response = await projectApi.patchProject(id, request)
    return this._convertProjectResponseDTOToProjectModel(response)
  }

  public deleteProjectById = async (id: number): Promise<ProjectModel> => {
    const response: DeleteProjectResponseDTO =
      await projectApi.deleteProject(id)

    return this._convertProjectResponseDTOToProjectModel(response)
  }

  public async startProjectMockServer(
    id: number,
  ): Promise<ProjectMockServerStatus> {
    const response: ProjectMockServerResponseDTO =
      await projectApi.startProject(id)
    return {
      status: response.status,
    }
  }

  public async stopProjectMockServer(
    id: number,
  ): Promise<ProjectMockServerStatus> {
    const response: ProjectMockServerResponseDTO =
      await projectApi.stopProject(id)
    return {
      status: response.status,
    }
  }
  //endregion

  //region Adapter Methods

  private _convertCreateProjectInputToPatchProjectRequestDTO = (
    request: CreateProjectInput,
  ): PatchProjectRequestDTO => {
    return {
      name: request.name,
      description: request.description,
    }
  }

  private _convertCreateProjectInputToCreateProjectRequestDTO = (
    body: CreateProjectInput,
  ): CreateProjectRequestDTO => {
    return {
      name: body.name,
      description: body.description,
    }
  }

  private _convertProjectResponseDTOToProjectModel = (
    response: ProjectResponseDTO,
  ): ProjectModel => {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      createdAt: new Date(response.createdAt),
    }
  }

  //endregion
}

export const projectService = new ProjectService()
