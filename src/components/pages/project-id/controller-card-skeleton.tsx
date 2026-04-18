import { Skeleton } from "@/components/ui/skeleton"

export default function ControllerCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="flex items-center space-x-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}
