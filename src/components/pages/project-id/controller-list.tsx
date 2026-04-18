import { useControllers } from "#/hooks/use-controller"
import ControllerCard from "./controller-card"
import { ControllerListError } from "./controller-list-error"
import ControllerListSkeleton from "./controller-list-skeleton"

export default function ControllerList() {
  const { controllers } = useControllers("p1")

  if (controllers.isLoading) return <ControllerListSkeleton />

  if (controllers.isError)
    return <ControllerListError onRetry={controllers.refetch} />

  return (
    <div className="grid gap-4">
      {controllers.data?.map((c) => (
        <ControllerCard key={c.id} controller={c} />
      ))}
    </div>
  )
}
