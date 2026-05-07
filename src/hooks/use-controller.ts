import { controllerService } from "#/backend/services/controller.services"
import { useQuery } from "@tanstack/react-query"

export function useControllers(projectId: number) {
  const controllers = useQuery({
    queryKey: ["controllers", projectId],
    queryFn: () => {
      return controllerService.getControllersByProjectById(projectId)
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  return { controllers }
}

export function useController(controllerId: number) {
  const controller = useQuery({
    queryKey: ["controller", controllerId],
    queryFn: () => {
      return controllerService.getControllerById(controllerId)
    },
    enabled: !!controllerId,
  })

  return { controller }
}
