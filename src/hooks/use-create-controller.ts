import { controllerService } from "#/backend/services/controller.services"
import type { CreateController } from "#/schemas/create-controller-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useCreateController(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateController) => {
      return await controllerService.createController(data, Number(projectId))
    },

    onSuccess: (newController) => {
      notificationService.success("Controller created successfully")

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      notificationService.error("Failed to create controller")
    },
  })
}
