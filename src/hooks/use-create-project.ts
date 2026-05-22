import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      notificationService.success("Project created successfully")
    },
    onError: () => {
      notificationService.error("Failed to create project")
    },
  })
}
