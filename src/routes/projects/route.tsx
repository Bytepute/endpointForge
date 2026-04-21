import Header from "#/components/header"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
})

function ProjectsLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
