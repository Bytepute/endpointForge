import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ControllerListErrorProps = {
  onRetry: () => void
}

export function ControllerListError({ onRetry }: ControllerListErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">
            Failed to load controllers. Please try again.
          </p>
        </div>

        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </CardContent>
    </Card>
  )
}
