import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useStartMockServer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.startProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mockServer"] })
      toast.success("Project mock server started")
    },
    onError: () => {
      toast.error("Failed to start project mock server")
    },
  })
}

export function useStopMockServer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.stopProjectMockServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mockServer"] })
      toast.success("Project mock server stopped")
    },
    onError: () => {
      toast.error("Failed to stop project mock server")
    },
  })
}
