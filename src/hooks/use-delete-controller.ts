import { deleteController } from "#/backend/services/controller.services"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteController() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteController(id)
    },

    onSuccess: (deletedController) => {
      console.log("Controller deleted:", deletedController)

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      console.error("Failed to delete controller:", error)
    },
  })
}
