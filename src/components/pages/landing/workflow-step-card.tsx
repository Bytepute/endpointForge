import { cn } from "#/lib/utils"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

export type WorkflowStep = {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

type WorkflowStepCardProps = {
  step: WorkflowStep
  index: number
  isLast: boolean
  isRtl: boolean
  reduceMotion: boolean | null
}

export default function WorkflowStepCard({
  step,
  index,
  isLast,
  isRtl,
  reduceMotion,
}: WorkflowStepCardProps) {
  const Icon = step.icon

  return (
    <motion.div
      className="relative rounded-lg border bg-card/80 p-5 shadow-sm"
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
        show: reduceMotion ? {} : { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="relative z-10 flex size-10 items-center justify-center rounded-md border bg-background shadow-sm">
          <Icon className="size-5 text-foreground" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-semibold">{step.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        {step.description}
      </p>

      {!isLast && <StepConnector isRtl={isRtl} />}
    </motion.div>
  )
}

function StepConnector({ isRtl }: { isRtl: boolean }) {
  return (
    <span
      className={cn(
        "absolute top-8 hidden h-px w-8 bg-foreground md:block",
        isRtl ? "-left-4" : "-right-4",
      )}
      aria-hidden="true"
    />
  )
}
