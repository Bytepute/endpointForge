import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { useStartMockServer, useStopMockServer } from "#/hooks/use-mock-server"
import type { ProjectModel } from "#/schemas/projects.schema"

export default function ServerCard({ project }: { project: ProjectModel }) {
  const startProject = useStartMockServer()
  const stopProject = useStopMockServer()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Mock Server
          {/*TODO: change to status coming from api*/}
          <Badge variant="secondary">RUNNING</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{project.description}</p>

        <div className="space-x-2">
          <Button
            onClick={() => startProject.mutate(Number(project.id))}
            disabled={startProject.isPending}
            variant="outline"
          >
            Start
          </Button>
          <Button
            onClick={() => stopProject.mutate(Number(project.id))}
            disabled={stopProject.isPending}
            variant="destructive"
          >
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
