import { useDeleteEndpoint } from '#/hooks/use-delete-endpoint'
import { useEndpoint } from '#/hooks/use-endpoint'
import { useState } from 'react'
import { EndpointCard } from './endpoint-card'
import { EndpointCardSkeleton } from './endpoint-card-skeleton'
import { EndpointErrorState } from './endpoint-error-state'

type Props = {
  basePath: string
  controllerId: string
}

export default function Endpoints({ basePath, controllerId }: Props) {
  const { endpoints } = useEndpoint(controllerId)
  const deleteMutation = useDeleteEndpoint(controllerId)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const deleteEndpoint = (id: string) => {
    setDeletingId(id)
    deleteMutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    })
  }

  if (endpoints.isLoading) {
    return <EndpointCardSkeleton />
  }

  if (endpoints.isError) {
    return <EndpointErrorState onRetry={endpoints.refetch} />
  }

  return (
    <EndpointCard
      endpoints={endpoints.data ?? undefined}
      basePath={basePath}
      handleDeleteEndpoint={deleteEndpoint}
      deleteId={deletingId}
      controllerId={controllerId}
    />
  )
}
