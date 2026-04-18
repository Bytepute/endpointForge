import type { ControllerDTO } from "#/backend/dtos/controller.dto"
import { Button } from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { useDeleteController } from "#/hooks/use-delete-controller"
import { useNavigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

type ControllerCardProps = {
  controller: ControllerDTO
}

export default function ControllerCard({ controller }: ControllerCardProps) {
  const navigate = useNavigate()
  const deleteController = useDeleteController()
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
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
          <Button
            disabled={deleteController.isPending}
            onClick={() => deleteController.mutate(controller.id)}
            variant="destructive"
          >
            {deleteController.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {deleteController.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
