import { createFileRoute, Outlet } from "@tanstack/react-router"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "#/components/pages/projects-list/app-sidebar"

export const Route = createFileRoute("/projects")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        <section className="w-full">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
