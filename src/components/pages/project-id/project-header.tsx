type Props = {
  name: string
  projectId: string
}

export default function ProjectHeader({ name, projectId }: Props) {
  return (
    <header>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-muted-foreground text-sm">Project ID: {projectId}</p>
    </header>
  )
}
