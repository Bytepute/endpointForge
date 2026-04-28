import { useQuery } from "@tanstack/react-query"
import { getProjects } from "#/backend/services/project.service"

export interface CreateProjectInput {
  name: string
  description?: string
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
}
