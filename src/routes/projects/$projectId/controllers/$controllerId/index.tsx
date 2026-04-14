import ControllerHeader from '#/components/pages/controller-id/controller-header'
import Endpoints from '#/components/pages/controller-id/endpoints'
import { useController } from '#/hooks/use-controller'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/projects/$projectId/controllers/$controllerId/',
)({
  component: ControllerDetailPage,
})

function ControllerDetailPage() {
  const { projectId, controllerId } = Route.useParams()
  const { controller } = useController(projectId)

  return (
    <div className="p-8 max-w-4xl space-y-6 mx-auto min-h-dvh">
      <ControllerHeader
        basePath={controller.data?.basePath ?? 'N/A'}
        projectId={projectId}
        isLoading={controller.isLoading}
      />
      <Endpoints
        basePath={controller.data?.basePath ?? 'N/A'}
        controllerId={controllerId}
      />
    </div>
  )
}
