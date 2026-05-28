import { Badge } from "@/components/ui/badge"
import {
  Boxes,
  FolderKanban,
  Network,
  PlayCircle,
  Waypoints,
} from "lucide-react"
import { useLandingI18n } from "./landing-i18n"
import { motion, useReducedMotion } from "framer-motion"
import WorkflowStepCard, { type WorkflowStep } from "./workflow-step-card"

export default function HowItWorks() {
  const { text, isRtl } = useLandingI18n()
  const reduceMotion = useReducedMotion()
  const steps: Array<WorkflowStep> = [
    {
      id: "project",
      icon: FolderKanban,
      title: text.howItWorks.projectTitle,
      description: text.howItWorks.projectDescription,
    },
    {
      id: "controller",
      icon: Network,
      title: text.howItWorks.controllerTitle,
      description: text.howItWorks.controllerDescription,
    },
    {
      id: "endpoint",
      icon: Boxes,
      title: text.howItWorks.endpointTitle,
      description: text.howItWorks.endpointDescription,
    },
    {
      id: "use",
      icon: PlayCircle,
      title: text.howItWorks.useTitle,
      description: text.howItWorks.useDescription,
    },
  ]

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <motion.div
        className="mx-auto mb-12 max-w-3xl text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Badge variant="outline" className="mb-4 rounded-md">
          <Waypoints className="size-3.5" />
          {text.howItWorks.eyebrow}
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {text.howItWorks.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {text.howItWorks.description}
        </p>
      </motion.div>

      <motion.div
        className="relative grid gap-4 md:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08,
            },
          },
        }}
      >
        <motion.div
          className="absolute left-6 right-6 top-8 hidden h-px bg-border md:block"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ originX: isRtl ? 1 : 0 }}
        />
        {steps.map((step, index) => (
          <WorkflowStepCard
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            isRtl={isRtl}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </section>
  )
}
