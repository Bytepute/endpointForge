import { Badge } from "@/components/ui/badge"
import { cn } from "#/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { useLandingI18n } from "./landing-i18n"
import type { RequestField } from "./mock-api-preview-types"

type MockApiRequestPanelProps = {
  fields: Array<RequestField>
}

export default function MockApiRequestPanel({
  fields,
}: MockApiRequestPanelProps) {
  const { text } = useLandingI18n()
  const reduceMotion = useReducedMotion()

  return (
    <div className="border-b p-5 lg:border-b-0 lg:border-r rtl:lg:border-l rtl:lg:border-r-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {text.hero.requestLabel}
          </p>
          <h2 className="mt-1 font-semibold">{text.hero.endpointName}</h2>
        </div>

        <Badge className="rounded-md bg-foreground text-background hover:bg-foreground">
          mock
        </Badge>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <RequestFieldCard
            key={field.id}
            field={field}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <EndpointBadges />
    </div>
  )
}

function RequestFieldCard({
  field,
  index,
  reduceMotion,
}: {
  field: RequestField
  index: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.div
      className="rounded-lg border bg-background/70 p-3"
      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.38 + index * 0.07,
        ease: "easeOut",
      }}
    >
      <p className="mb-1 text-xs text-muted-foreground">{field.label}</p>
      <p
        dir="ltr"
        className={cn(
          "truncate font-mono text-sm font-semibold",
          field.accent && "text-foreground",
        )}
      >
        {field.value}
      </p>
    </motion.div>
  )
}

function EndpointBadges() {
  const badges = ["GET /users", "201 Created", "JSON"]

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {badges.map((badge) => (
        <Badge
          key={badge}
          variant="outline"
          className="rounded-md font-mono"
          dir="ltr"
        >
          {badge}
        </Badge>
      ))}
    </div>
  )
}
