import { createProject } from "#/backend/services/projects.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}
