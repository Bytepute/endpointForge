import { Link } from "@tanstack/react-router"
import { Folder, FolderOpen, ChevronRight, ChevronDown } from "lucide-react"
import { useControllers } from "#/hooks/use-controller"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ControllerNavSection } from "./controller-nav-section"
import type { ProjectModel } from "#/schemas/projects.schema"
import { useAccordion } from "#/hooks/use-accordian"

type Props = { project: ProjectModel }

export function ProjectNavSection({ project }: Props) {
  const { controllers } = useControllers(project.id)
  const controllerList = controllers.data ?? []
  const projectKey = `project-${project.id}`
  const { isExpanded, toggle } = useAccordion({ [projectKey]: true })
  const shouldExpand = isExpanded(projectKey)

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="w-full justify-between">
          <div className="flex items-center justify-between w-full">
            <Link
              to="/projects/$projectId"
              params={{ projectId: String(project.id) }}
              className="flex items-center gap-2 flex-1"
              activeProps={{ className: "font-semibold" }}
            >
              {shouldExpand ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
              <span>{project.name}</span>
            </Link>
            {controllerList.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggle(projectKey)
                }}
                className="p-1 hover:bg-accent rounded"
                aria-label={
                  shouldExpand ? "Collapse project" : "Expand project"
                }
              >
                {shouldExpand ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {shouldExpand && controllerList.length > 0 && (
        <div className="pl-6 space-y-1">
          {controllerList.map((controller) => (
            <ControllerNavSection
              key={controller.id}
              controller={controller}
              projectId={project.id}
            />
          ))}
        </div>
      )}
    </>
  )
}
