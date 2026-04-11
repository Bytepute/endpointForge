import { createFileRoute } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import ProjectHeader from '#/components/pages/project-id/project-header'
import ServerCard from '#/components/pages/project-id/server-card'
import Controllers from '#/components/pages/project-id/controllers'

export const Route = createFileRoute('/projects/$projectId/')({
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const { projectId } = Route.useParams()

  // TODO: replace mock data after api
  const project = { name: 'Weather App' }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto min-h-dvh">
      <ProjectHeader name={project.name} projectId={projectId} />
      <ServerCard />
      <Separator />
      <Controllers />
    </div>
  )
}
