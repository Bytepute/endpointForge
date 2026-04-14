import type { Project } from '#/schemas/projects.schema'
import ProjectsCard from './projects-card'

type ProjectListProps = {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-y-4">
      {projects.map((project: Project) => (
        <ProjectsCard key={project.id} project={project} />
      ))}
    </div>
  )
}
