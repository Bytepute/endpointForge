import { projectService } from "#/backend/services/project.service"
import { useQuery } from "@tanstack/react-query"

export interface CreateProjectInput {
  name: string
  description?: string
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getAllProjects,
  })
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectService.getProjectById(Number(projectId)),
    enabled: !!projectId,
  })
}
