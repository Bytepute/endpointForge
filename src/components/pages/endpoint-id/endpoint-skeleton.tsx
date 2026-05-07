import { Skeleton } from "#/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "#/components/ui/card"

export function EndpointSkeleton() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl space-y-6 mx-auto min-h-dvh">
      {/* Header skeleton - same responsive structure */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-9 w-full md:w-32" /> {/* Back button */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Skeleton className="h-9 flex-1 md:flex-none md:w-24" />{" "}
          {/* Copy URL */}
          <Skeleton className="h-9 flex-1 md:flex-none md:w-20" /> {/* Edit */}
          <Skeleton className="h-9 flex-1 md:flex-none md:w-20" />{" "}
          {/* Delete */}
        </div>
      </div>

      {/* Card skeleton remains unchanged */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-7 w-48" />
          </div>
          <Skeleton className="h-4 w-48 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
