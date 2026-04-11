import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'

export default function ControllerList() {
  // TODO: remove mock data after api
  const controllers = [
    { id: 1, basePath: '/user', endpoints: 3 },
    { id: 2, basePath: '/weather', endpoints: 2 },
  ]
  return (
    <div className="grid gap-4">
      {controllers.map((c) => (
        <Card key={c.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium">{c.basePath}</p>
              <p className="text-sm text-muted-foreground">
                Endpoints: {c.endpoints}
              </p>
            </div>

            <div className="space-x-2">
              <Button variant="outline">Open</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
