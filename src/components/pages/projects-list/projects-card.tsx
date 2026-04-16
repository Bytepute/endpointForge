import { Button } from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { useDeleteProject } from "#/hooks/use-delete-project"
import type { Project } from "#/schemas/projects.schema"
import { useNavigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

type ProjectCardProps = {
  project: Project
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
                params: { projectId: project.id },
              })
            }
            variant="outline"
          >
            Open
          </Button>
          <Button
            onClick={() => deleteMutation.mutate(project.id)}
            variant="destructive"
          >
            {deleteMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
