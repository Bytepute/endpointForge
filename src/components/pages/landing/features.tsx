import { Badge } from "@/components/ui/badge"
import { Braces, GitBranch, Route, TestTube2 } from "lucide-react"
import { useLandingI18n } from "./landing-i18n"
import { motion, useReducedMotion } from "framer-motion"
import FeatureCard from "./feature-card"
import type {Feature} from "./feature-card";

export default function Features() {
  const { text } = useLandingI18n()
  const reduceMotion = useReducedMotion()
  const features: Array<Feature> = [
    {
      id: "routes",
      icon: Route,
      title: text.features.mockServerTitle,
      description: text.features.mockServerDescription,
      meta: "GET /products/:id",
    },
    {
      id: "responses",
      icon: Braces,
      title: text.features.endpointsTitle,
      description: text.features.endpointsDescription,
      meta: "{ status, body }",
    },
    {
      id: "testing",
      icon: TestTube2,
      title: text.features.speedTitle,
      description: text.features.speedDescription,
      meta: "demo -> test -> ship",
    },
  ]

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="space-y-3">
          <Badge variant="outline" className="rounded-md">
            <GitBranch className="size-3.5" />
            {text.features.eyebrow}
          </Badge>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight leading-relaxed sm:text-4xl">
            {text.features.title}
          </h2>
        </div>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
          {text.features.description}
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-3"
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
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </section>
  )
}
