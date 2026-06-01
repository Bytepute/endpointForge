type MockApiPreviewToolbarProps = {
  label: string
}

export default function MockApiPreviewToolbar({
  label,
}: MockApiPreviewToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        <span className="size-2.5 rounded-full bg-foreground/40" />
      </div>

      <div className="font-mono text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
