// routes/projects/$projectId/controllers/$controllerId/endpoints/$endpointId.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "#/components/ui/button"
import { useDeleteEndpoint } from "#/hooks/use-delete-endpoint"
import { useEndpointFromList } from "#/hooks/use-endpoint-from-list"
import EditEndpointDialog from "#/components/pages/controller-id/edit-endpoint-dialog"
import { EndpointSkeleton } from "#/components/pages/endpoint-id/endpoint-skeleton"
import { EndpointHeader } from "#/components/pages/endpoint-id/endpoint-header"
import { EndpointDetails } from "#/components/pages/endpoint-id/endpoint-details"

export const Route = createFileRoute(
  "/_dashboard/projects/$projectId/controllers/$controllerId/endpoints/$endpointId",
)({
  component: EndpointPage,
})

function EndpointPage() {
  const { projectId, controllerId, endpointId } = Route.useParams()
  const navigate = useNavigate()
  const { endpoint, isLoading, error } = useEndpointFromList(
    controllerId,
    endpointId,
  )
  const deleteMutation = useDeleteEndpoint(controllerId)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleBack = () => {
    navigate({
      to: "/projects/$projectId/controllers/$controllerId",
      params: { projectId, controllerId },
    })
  }

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(endpointId)
    handleBack()
  }

  if (isLoading) return <EndpointSkeleton />

  if (error || !endpoint) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive">Failed to load endpoint</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="p-8 max-w-4xl space-y-6 mx-auto min-h-dvh">
        <EndpointHeader
          endpoint={endpoint}
          onBack={handleBack}
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={handleDelete}
        />
        <EndpointDetails endpoint={endpoint} />
      </div>

      {isEditDialogOpen && (
        <EditEndpointDialog
          endpoint={endpoint}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </>
  )
}
