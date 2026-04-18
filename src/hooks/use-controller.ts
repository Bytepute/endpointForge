import {
  getControllerById,
  getControllersByProject,
} from "#/backend/services/controller.services"
import { useQuery } from "@tanstack/react-query"

export function useControllers(projectId: string) {
  const controllers = useQuery({
    queryKey: ["controllers", projectId],
    queryFn: () => {
      return getControllersByProject(projectId)
    },
    enabled: !!projectId,
  })

  return { controllers }
}

export function useController(controllerId: string) {
  const controller = useQuery({
    queryKey: ["controller", controllerId],
    queryFn: () => {
      return getControllerById(controllerId)
    },
    enabled: !!controllerId,
  })

  return { controller }
}
