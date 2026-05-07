// components/pages/project-id/project-header.tsx
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { Link } from "@tanstack/react-router"

type Props = {
  name: string
  projectId: string
  isLoading?: boolean
}

export default function ProjectHeader({
  name,
  projectId,
  isLoading = false,
}: Props) {
  return (
    <header className="space-y-4">
      <Link to={"/projects"}>
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <div>
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Project ID: {projectId}
            </p>
          </>
        )}
      </div>
    </header>
  )
}
