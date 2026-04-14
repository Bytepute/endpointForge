import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

export function EndpointErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endpoints</CardTitle>
      </CardHeader>

      <CardContent className="py-10 flex flex-col items-center gap-3">
        <p className="text-sm text-destructive">Failed to load endpoints.</p>

        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </CardContent>
    </Card>
  )
}
