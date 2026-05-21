import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.deleteProjectById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      notificationService.success("Project deleted successfully")
    },
    onError: () => {
      notificationService.error("Failed to delete project")
    },
  })
}
