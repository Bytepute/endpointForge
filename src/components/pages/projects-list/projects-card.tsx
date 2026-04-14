import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { useProjects } from '#/hooks/use-projects'
import type { Project } from '#/schemas/projects.schema'
import { useNavigate } from '@tanstack/react-router'

type ProjectCardProps = {
  project: Project
}

export default function ProjectsCard({ project }: ProjectCardProps) {
  const { handleDeleteProject } = useProjects()
  const navigate = useNavigate()
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-xl font-medium">{project.name}</p>
          <p className="font-light">{project.description}</p>
        </div>

        <div className="space-x-2">
          <Button
            onClick={() =>
              navigate({
                to: '/projects/$projectId',
                params: { projectId: project.id },
              })
            }
            variant="outline"
          >
            Open
          </Button>
          <Button
            onClick={() => handleDeleteProject(project.id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
