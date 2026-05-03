import { controllerService } from "#/backend/services/controller.services"
import type { CreateController } from "#/schemas/create-controller-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useCreateController(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateController) => {
      return await controllerService.createController(data, Number(projectId))
    },

    onSuccess: (newController) => {
      toast.success("Controller created successfully")

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      toast.error("Failed to create controller")
    },
  })
}
