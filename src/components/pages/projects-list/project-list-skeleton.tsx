import ProjectsCardSkeleton from "./project-card-skeleton"

export function ProjectsListSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <ProjectsCardSkeleton key={i} />
      ))}
    </div>
  )
}
