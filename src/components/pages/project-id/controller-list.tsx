import { useControllers } from "#/hooks/use-controller"
import { SquarePlus } from "lucide-react"
import Empty from "../shared/empty"
import ControllerCard from "./controller-card"
import { ControllerListError } from "./controller-list-error"
import ControllerListSkeleton from "./controller-list-skeleton"

type Props = {
  projectId: string
}

export default function ControllerList({ projectId }: Props) {
  const { controllers } = useControllers(Number(projectId))

  if (controllers.isLoading) return <ControllerListSkeleton />

  if (controllers.isError)
    return <ControllerListError onRetry={controllers.refetch} />

  return (
    <div className="grid gap-4">
      {controllers.data && controllers.data.length > 0 ? (
        controllers.data.map((c) => (
          <ControllerCard key={c.id} controller={c} />
        ))
      ) : (
        <Empty
          title="No Controller"
          description="Create a new Controller to get started"
          icon={SquarePlus}
        />
      )}
    </div>
  )
}
