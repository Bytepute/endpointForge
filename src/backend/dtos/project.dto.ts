// Request DTOs

type ProjectBaseRequestDTO = {
  name: string
  description?: string
}

type CreateProjectRequestDTO = ProjectBaseRequestDTO
type PatchProjectRequestDTO = ProjectBaseRequestDTO

// Response DTOs
//
type ProjectResponseDTO = {
  id: number
  name: string
  description: string
  createdAt: string
}

type CreateProjectResponseDTO = ProjectResponseDTO
type PatchProjectResponseDTO = ProjectResponseDTO
type DeleteProjectResponseDTO = ProjectResponseDTO
