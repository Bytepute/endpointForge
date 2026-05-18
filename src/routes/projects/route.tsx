import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "#/components/pages/projects-list/app-sidebar"
import { authTokenService } from "#/backend/services/auth-token.service"

export const Route = createFileRoute("/projects")({
  beforeLoad: () => {
    if (!authTokenService.hasAccessToken()) {
      throw redirect({ to: "/" })
    }
  },
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
          {/* <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          /> */}
        </header>

        <section className="w-full">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
