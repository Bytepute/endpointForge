import { getControllerByProject } from '#/backend/services/controller.services'
import { useQuery } from '@tanstack/react-query'

export function useController(projectId: string) {
  const controller = useQuery({
    queryKey: ['controller', projectId],
    queryFn: () => {
      return getControllerByProject(projectId)
    },
    enabled: !!projectId,
  })

  return { controller }
}
