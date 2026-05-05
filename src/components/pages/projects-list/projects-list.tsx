import { useProjects } from "#/hooks/use-projects"
import type { ProjectModel } from "#/schemas/projects.schema"
import { Folder } from "lucide-react"
import { ProjectsListError } from "./project-list-error"
import { ProjectsListSkeleton } from "./project-list-skeleton"
import ProjectsCard from "./projects-card"
import Empty from "../shared/empty"

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
      {projects.data && projects.data.length > 0 ? (
        projects.data.map((project: ProjectModel) => (
          <ProjectsCard key={project.id} project={project} />
        ))
      ) : (
        <Empty
          title="No Project"
          description="Create a new Project to get started"
          icon={Folder}
        />
      )}
    </div>
  )
}
