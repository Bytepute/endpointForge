import type { ProjectModel } from "#/schemas/projects.schema"

interface MockServerStatus {
  status: "running" | "stopped"
  port?: number
}

export function useMockServerStatus(project: ProjectModel): MockServerStatus {
  return {
    status: project.isRuntimeEnabled ? "running" : "stopped",
    port: project.port,
  }
}
