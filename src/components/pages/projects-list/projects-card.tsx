import { Button } from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { useDeleteProject } from "#/hooks/use-delete-project"
import type { ProjectModel } from "#/schemas/projects.schema"
import { useNavigate } from "@tanstack/react-router"
import { ConfirmDialog } from "../shared/confirm-dialog"
import { UpdateProjectDialog } from "./update-project-dialog"

type ProjectCardProps = {
  project: ProjectModel
}

export default function ProjectsCard({ project }: ProjectCardProps) {
  const deleteMutation = useDeleteProject()
  const navigate = useNavigate()
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-xl font-medium">{project.name}</p>
          <p className="font-light">{project.description}</p>
        </div>

        <div className="space-x-2">
          <Button
            onClick={() =>
              navigate({
                to: "/projects/$projectId",
                params: { projectId: project.id.toString() },
              })
            }
            variant="outline"
          >
            Open
          </Button>

          <UpdateProjectDialog
            project={project}
            trigger={<Button variant="secondary">Edit</Button>}
          />

          <ConfirmDialog
            trigger={<Button variant="destructive">Delete</Button>}
            onConfirm={() => deleteMutation.mutate(project.id)}
            loading={deleteMutation.isPending}
          />
        </div>
      </CardContent>
    </Card>
  )
}
