import type { ControllerDTO } from "#/backend/dtos/controller.dto"
import { Button } from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { useDeleteController } from "#/hooks/use-delete-controller"
import { useNavigate } from "@tanstack/react-router"
import { ConfirmDialog } from "../shared/confirm-dialog"

type ControllerCardProps = {
  controller: ControllerDTO
}

export default function ControllerCard({ controller }: ControllerCardProps) {
  const navigate = useNavigate()
  const deleteController = useDeleteController()
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="font-medium">{controller.basePath}</p>
          <p className="text-sm text-muted-foreground">
            Endpoints: {controller.endpoints.length}
          </p>
        </div>

        <div className="space-x-2">
          <Button
            onClick={() =>
              navigate({
                to: "/projects/$projectId/controllers/$controllerId",
                params: {
                  projectId: controller.projectId,
                  controllerId: controller.id,
                },
              })
            }
            variant="outline"
          >
            Open
          </Button>
          <ConfirmDialog
            trigger={<Button variant="destructive">Delete</Button>}
            loading={deleteController.isPending}
            onConfirm={() => deleteController.mutate(controller.id)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
