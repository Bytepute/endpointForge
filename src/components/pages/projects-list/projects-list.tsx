import { useProjects } from "#/hooks/use-projects"
import type { Project } from "#/schemas/projects.schema"
import { ProjectsListError } from "./project-list-error"
import { ProjectsListSkeleton } from "./project-list-skeleton"
import ProjectsCard from "./projects-card"

export default function ProjectsList() {
  const projects = useProjects()

  if (projects.isLoading) {
    return <ProjectsListSkeleton />
  }

  if (projects.isError) {
    return <ProjectsListError onRetry={projects.refetch} />
  }

  return (
    <div className="flex flex-col gap-y-4">
      {projects.data &&
        projects.data.map((project: Project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
    </div>
  )
}
