import { Skeleton } from "#/components/ui/skeleton"
import { useProjects } from "#/hooks/use-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { useParams, useRouterState } from "@tanstack/react-router"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { ProjectNavSection } from "./project-nav-section"
import ProjectSidebarFooter from "./project-sidebar-footer"

export function AppSidebar() {
  const { data: projects, isLoading } = useProjects()
  const params = useParams({ strict: false })
  const currentPath = useRouterState().location.pathname

  return (
    <SidebarProvider value={{ currentPath, activeProjectId: params.projectId }}>
      <Sidebar variant="floating">
        <SidebarHeader className="border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-xs text-muted-foreground">API Management</p>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="w-full h-8" />
                    ))
                  : projects?.map((project) => (
                      <ProjectNavSection key={project.id} project={project} />
                    ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <ProjectSidebarFooter />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
