import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useStartMockServer(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.startProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      notificationService.success("Project mock server started")
    },
    onError: () => {
      notificationService.error("Failed to start project mock server")
    },
  })
}

export function useStopMockServer(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.stopProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      notificationService.success("Project mock server stopped")
    },
    onError: () => {
      notificationService.error("Failed to stop project mock server")
    },
  })
}
