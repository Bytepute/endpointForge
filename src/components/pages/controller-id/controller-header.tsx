import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { Link } from "@tanstack/react-router"

type Props = {
  basePath: string
  projectId: string
  isLoading: boolean
}

export default function ControllerHeader({
  basePath,
  projectId,
  isLoading,
}: Props) {
  return (
    <div className="space-y-4">
      <Link to="/projects/$projectId" params={{ projectId }}>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-bold">
          {isLoading ? (
            <Skeleton className="h-7 w-48" />
          ) : (
            `Controller: ${basePath}`
          )}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            `Project: ${projectId}`
          )}
        </p>
      </div>
    </div>
  )
}
