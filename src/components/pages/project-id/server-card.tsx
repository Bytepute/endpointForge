import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { useStartMockServer, useStopMockServer } from "#/hooks/use-mock-server"
import { useMockServerStatus } from "#/hooks/use-mock-server-status"
import type { ProjectModel } from "#/schemas/projects.schema"
import { Server, Power, PowerOff, Loader2 } from "lucide-react"

export default function ServerCard({ project }: { project: ProjectModel }) {
  const startProject = useStartMockServer(String(project.id))
  const stopProject = useStopMockServer(String(project.id))
  const serverStatus = useMockServerStatus(project)

  const isRunning = serverStatus.status === "running"
  const isLoading = startProject.isPending || stopProject.isPending

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>Mock Server</span>
          </div>
          <div className="flex items-center gap-2">
            {project.port && (
              <Badge variant="outline" className="font-mono">
                Port: {project.port}
              </Badge>
            )}
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "● Running" : "○ Stopped"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {project.description && (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-2 ml-auto">
            <Button
              onClick={() => startProject.mutate(Number(project.id))}
              disabled={isRunning || isLoading}
              variant="outline"
              size="sm"
            >
              {startProject.isPending ? (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              ) : (
                <Power className="mr-2 h-3 w-3" />
              )}
              Start
            </Button>
            <Button
              onClick={() => stopProject.mutate(Number(project.id))}
              disabled={!isRunning || isLoading}
              variant="destructive"
              size="sm"
            >
              {startProject.isPending ? (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              ) : (
                <PowerOff className="mr-2 h-3 w-3" />
              )}
              Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
