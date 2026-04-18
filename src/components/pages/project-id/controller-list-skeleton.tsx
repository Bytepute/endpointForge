import ControllerCardSkeleton from "./controller-card-skeleton"

export default function ControllerListSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <ControllerCardSkeleton key={i} />
      ))}
    </div>
  )
}
