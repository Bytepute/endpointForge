import ProjectsDialog from '#/components/pages/projects-list/projects-dialog'
import ProjectsList from '#/components/pages/projects-list/projects-list'
import { useProjects } from '#/hooks/use-projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  //region hooks
  const { handleCreateProject, createMutation, projects } = useProjects()
  //endregion

  return (
    <main className="p-8 mx-auto max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <ProjectsDialog
          handleCreateProject={handleCreateProject}
          createMutation={createMutation}
        />
      </div>
      <ProjectsList projects={projects} />
    </main>
  )
}
