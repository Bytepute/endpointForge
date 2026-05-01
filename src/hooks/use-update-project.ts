import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { UpdateProjectInput } from "#/schemas/projects.schema"

export function useUpdateProject(projectId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateProjectInput) => {
      if (!projectId) {
        throw new Error("Project Id cannot be undefined")
      }
      return projectService.patchProjectById(projectId, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project updated successfully")
    },
    onError: () => {
      toast.error("Failed to update project")
    },
  })
}
