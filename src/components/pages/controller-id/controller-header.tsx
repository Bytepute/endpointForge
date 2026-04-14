import { Skeleton } from '#/components/ui/skeleton'

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
    <div>
      <h1 className="text-2xl font-bold">
        {isLoading ? (
          <Skeleton className="h-7 w-48" />
        ) : (
          `Controller: ${basePath}`
        )}
      </h1>

      <p className="text-sm text-muted-foreground">Project: {projectId}</p>
    </div>
  )
}
