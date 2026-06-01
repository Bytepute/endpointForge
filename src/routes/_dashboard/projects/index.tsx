import ProjectsDialog from "#/components/pages/projects-list/projects-dialog"
import ProjectsList from "#/components/pages/projects-list/projects-list"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/projects/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="p-8 mx-auto max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <ProjectsDialog />
      </div>
      <ProjectsList />
    </main>
  )
}
