import { controllerService } from "#/backend/services/controller.services"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationService } from "#/services/notification.service.ts"

export function useDeleteController() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      return await controllerService.deleteController(id)
    },

    onSuccess: (deletedController) => {
      notificationService.success("Controller deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      notificationService.error("Failed to delete controller")
    },
  })
}
