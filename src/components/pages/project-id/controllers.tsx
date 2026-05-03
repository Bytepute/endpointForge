import ControllerList from "./controller-list"
import CreateControllerDialog from "./create-controller-dialog"

type Props = {
  projectId: string
}

export default function Controllers({ projectId }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Controllers</h2>
        <CreateControllerDialog projectId={projectId} />
      </div>
      <ControllerList projectId={projectId} />
    </div>
  )
}
