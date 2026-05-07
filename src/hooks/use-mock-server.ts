import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useStartMockServer(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.startProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast.success("Project mock server started")
    },
    onError: () => {
      toast.error("Failed to start project mock server")
    },
  })
}

export function useStopMockServer(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.stopProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast.success("Project mock server stopped")
    },
    onError: () => {
      toast.error("Failed to stop project mock server")
    },
  })
}
