import type {
  CreateProjectInput,
  ProjectModel,
} from "#/schemas/projects.schema"
import { projectApi } from "../api/project-api"

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
