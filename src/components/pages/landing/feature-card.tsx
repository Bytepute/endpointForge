import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

export type Feature = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  meta: string
}

type FeatureCardProps = {
  feature: Feature
  reduceMotion: boolean | null
}

export default function FeatureCard({
  feature,
  reduceMotion,
}: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
        show: reduceMotion ? {} : { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <Card className="group h-full gap-5 rounded-lg bg-card/80 py-5 shadow-sm transition-colors hover:border-foreground/40">
        <CardHeader className="gap-4 px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
              <Icon className="size-5" />
            </div>
            <span
              className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
              dir="ltr"
            >
              {feature.meta}
            </span>
          </div>
          <CardTitle className="text-lg">{feature.title}</CardTitle>
        </CardHeader>

        <CardContent className="px-5 text-sm leading-7 text-muted-foreground">
          {feature.description}
        </CardContent>
      </Card>
    </motion.div>
  )
}
