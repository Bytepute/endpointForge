import { Link } from "@tanstack/react-router"
import { Server, Zap, ChevronRight, ChevronDown } from "lucide-react"
import { useEndpoints } from "#/hooks/use-endpoints"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { ControllerModel } from "#/models/controller.model"
import { useAccordion } from "#/hooks/use-accordian"

type Props = {
  controller: ControllerModel
  projectId: number
}

export function ControllerNavSection({ controller, projectId }: Props) {
  const { data: endpoints } = useEndpoints(String(controller.id))
  const endpointList = endpoints ?? []

  const controllerKey = `controller-${controller.id}`
  const { isExpanded, toggle } = useAccordion({ [controllerKey]: true })
  const shouldExpand = isExpanded(controllerKey)

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="w-full justify-between">
          <div className="flex items-center justify-between w-full">
            <Link
              to="/projects/$projectId/controllers/$controllerId"
              params={{
                projectId: String(projectId),
                controllerId: String(controller.id),
              }}
              className="flex items-center gap-2 flex-1"
              activeProps={{ className: "font-semibold" }}
            >
              <Server className="h-4 w-4" />
              <span>{controller.basePath}</span>
            </Link>
            {endpointList.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggle(controllerKey)
                }}
                className="p-1 hover:bg-accent rounded"
                aria-label={
                  shouldExpand ? "Collapse controller" : "Expand controller"
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

      {shouldExpand && endpointList.length > 0 && (
        <div className="pl-6 space-y-1">
          {endpointList.map((endpoint) => (
            <SidebarMenuItem key={endpoint.id}>
              <SidebarMenuButton asChild>
                <Link
                  to="/projects/$projectId/controllers/$controllerId/endpoints/$endpointId"
                  params={{
                    projectId: String(projectId),
                    controllerId: String(controller.id),
                    endpointId: String(endpoint.id),
                  }}
                  className="flex items-center gap-2"
                  activeProps={{ className: "font-semibold" }}
                >
                  <Zap className="h-3 w-3" />
                  <span className="text-sm">
                    {endpoint.method} {endpoint.path}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </>
  )
}
