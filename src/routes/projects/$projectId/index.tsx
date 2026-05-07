import { createFileRoute } from "@tanstack/react-router"
import { Separator } from "@/components/ui/separator"
import ProjectHeader from "#/components/pages/project-id/project-header"
import ServerCard from "#/components/pages/project-id/server-card"
import Controllers from "#/components/pages/project-id/controllers"
import { useProject } from "#/hooks/use-projects"

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const { projectId } = Route.useParams()
  const project = useProject(projectId)

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto min-h-dvh">
      <ProjectHeader
        name={project.data?.name ?? "Not Found"}
        projectId={projectId}
        isLoading={project.isLoading}
      />
      {project.data && <ServerCard project={project.data} />}
      <Separator />
      <Controllers projectId={projectId} />
    </div>
  )
}
