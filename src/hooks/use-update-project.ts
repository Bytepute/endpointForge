import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { UpdateProjectInput } from "#/schemas/projects.schema"
import { notificationService } from "#/services/notification.service.ts"

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
      notificationService.success("Project updated successfully")
    },
    onError: () => {
      notificationService.error("Failed to update project")
    },
  })
}
