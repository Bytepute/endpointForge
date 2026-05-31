// Enums
export const Status = {
  Failed: "FAILED",
  Success: "SUCCESS",
} as const
export type Status = (typeof Status)[keyof typeof Status]

// Request DTOs

type ProjectBaseRequestDTO = {
  name: string
  slug: string
  description?: string
}

export type CreateProjectRequestDTO = ProjectBaseRequestDTO
export type PatchProjectRequestDTO = ProjectBaseRequestDTO

// Response DTOs

export type ProjectResponseDTO = {
  id: number
  name: string
  slug: string
  description: string
  createdAt: string
  port: number
  isProjectRunning: boolean
}

export type CreateProjectResponseDTO = ProjectResponseDTO
export type PatchProjectResponseDTO = ProjectResponseDTO
export type DeleteProjectResponseDTO = ProjectResponseDTO

export type ProjectMockServerResponseDTO = { status: Status }
