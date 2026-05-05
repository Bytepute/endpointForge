import {
  Empty as ShadcnEmpty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty"
import type { LucideIcon } from "lucide-react"

type Props = {
  icon: LucideIcon
  title: string
  description?: string
}

export default function Empty({ icon: Icon, title, description }: Props) {
  return (
    <ShadcnEmpty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
    </ShadcnEmpty>
  )
}
