import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

export default function ServerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Mock Server
          <Badge variant="secondary">RUNNING</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">localhost:4010</p>

        <div className="space-x-2">
          <Button variant="outline">Start</Button>
          <Button variant="destructive">Stop</Button>
        </div>
      </CardContent>
    </Card>
  )
}
