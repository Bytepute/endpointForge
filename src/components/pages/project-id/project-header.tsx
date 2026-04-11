type Props = {
  name: string
  projectId: string
}

export default function ProjectHeader(props: Props) {
  const { name, projectId } = props
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-muted-foreground text-sm">Project ID: {projectId}</p>
    </div>
  )
}
