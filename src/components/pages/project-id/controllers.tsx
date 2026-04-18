import ControllerList from "./controller-list"
import CreateControllerDialog from "./create-controller-dialog"

export default function Controllers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Controllers</h2>
        <CreateControllerDialog />
      </div>
      <ControllerList />
    </div>
  )
}
