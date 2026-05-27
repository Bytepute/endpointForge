import { Badge } from "@/components/ui/badge"
import { Terminal } from "lucide-react"

type HeroBadgeProps = {
  label: string
}

export default function HeroBadge({ label }: HeroBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="gap-2 rounded-md border bg-background/80 px-3 py-1.5 font-mono text-xs"
    >
      <Terminal className="size-3.5" />
      {label}
    </Badge>
  )
}
