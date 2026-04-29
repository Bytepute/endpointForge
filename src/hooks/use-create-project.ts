import { projectService } from "#/backend/services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Project created successfully")
    },
    onError: () => {
      toast.error("Failed to create project")
    },
  })
}
