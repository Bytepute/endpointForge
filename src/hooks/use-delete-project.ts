import { deleteProject } from "#/backend/services/projects.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}
