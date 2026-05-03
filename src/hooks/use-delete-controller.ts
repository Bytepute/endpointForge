import { controllerService } from "#/backend/services/controller.services"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteController() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      return await controllerService.deleteController(id)
    },

    onSuccess: (deletedController) => {
      toast.success("Controller deleted successfully")

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      toast.error("Failed to delete controller")
    },
  })
}
