import { createController } from "#/backend/services/controller.services"
import type { CreateController } from "#/schemas/create-controller-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateController() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateController) => {
      return await createController(data)
    },

    onSuccess: (newController) => {
      console.log("Controller created:", newController)

      queryClient.invalidateQueries({
        queryKey: ["controllers"],
      })
    },

    onError: (error) => {
      console.error("Failed to create controller:", error)
    },
  })
}
