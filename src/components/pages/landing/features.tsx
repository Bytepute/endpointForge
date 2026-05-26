import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Braces, GitBranch, Route, TestTube2 } from "lucide-react"
import { useLandingI18n } from "./landing-i18n"
import { motion, useReducedMotion } from "framer-motion"

export default function Features() {
  const { text } = useLandingI18n()
  const reduceMotion = useReducedMotion()
  const features = [
    {
      icon: Route,
      title: text.features.mockServerTitle,
      description: text.features.mockServerDescription,
      meta: "GET /products/:id",
    },
    {
      icon: Braces,
      title: text.features.endpointsTitle,
      description: text.features.endpointsDescription,
      meta: "{ status, body }",
    },
    {
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
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
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
        {features.map((feature, i) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={i}
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
        })}
      </motion.div>
    </section>
  )
}
