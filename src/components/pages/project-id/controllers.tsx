import { Button } from '#/components/ui/button'
import ControllerList from './controller-list'

export default function Controllers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Controllers</h2>
        <Button>+ Create Controller</Button>
      </div>
      <ControllerList />
    </div>
  )
}
