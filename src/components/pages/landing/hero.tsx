import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"
import { useLandingI18n } from "./landing-i18n"
import { useAuthStore } from "#/stores/auth-store"
import { ArrowRight, Braces, CheckCircle2, Play, Terminal } from "lucide-react"
import { cn } from "#/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

export default function Hero() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
  const setRegisterModal = useAuthStore((state) => state.setRegisterModal)

  const handleCreateProject = () => {
    if (!isLoggedIn) {
      setRegisterModal(true)
      return
    }

    navigate({ to: "/projects" })
  }

  const { text } = useLandingI18n()
  const reduceMotion = useReducedMotion()
  const contentInitial = reduceMotion ? false : { opacity: 0, y: 18 }
  const contentAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 }

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:py-20 lg:py-24">
      <motion.div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 0.18 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-muted/70 to-transparent"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="flex flex-col items-start gap-7"
          initial="hidden"
          animate="show"
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
            variants={{
              hidden: contentInitial || {},
              show: contentAnimate || {},
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Badge
              variant="secondary"
              className="gap-2 rounded-md border bg-background/80 px-3 py-1.5 font-mono text-xs"
            >
              <Terminal className="size-3.5" />
              {text.hero.badge}
            </Badge>
          </motion.div>

          <motion.div
            className="space-y-5"
            variants={{
              hidden: contentInitial || {},
              show: contentAnimate || {},
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {text.hero.title}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {text.hero.description}
            </p>
          </motion.div>

          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            variants={{
              hidden: contentInitial || {},
              show: contentAnimate || {},
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              size="lg"
              onClick={handleCreateProject}
              className="h-11 justify-center px-5"
            >
              <Play className="size-4" />
              {text.hero.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 justify-center px-5"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {text.hero.secondaryCta}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </motion.div>

          <motion.div
            className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3"
            variants={{
              hidden: contentInitial || {},
              show: contentAnimate || {},
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {[
              text.hero.proofNoBackend,
              text.hero.proofJson,
              text.hero.proofTesting,
            ].map((item) => (
              <motion.div
                key={item}
                className="flex items-center gap-2 rounded-md border bg-background/70 px-3 py-2 text-sm text-muted-foreground shadow-sm"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <CheckCircle2 className="size-4 text-foreground" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <MockApiPreview />
      </div>
    </section>
  )
}

function MockApiPreview() {
  const { text, isRtl } = useLandingI18n()
  const reduceMotion = useReducedMotion()

  const fields = [
    { label: text.hero.fieldMethod, value: "POST", accent: true },
    { label: text.hero.fieldPath, value: text.hero.endpointPath },
    { label: text.hero.fieldStatus, value: text.hero.statusText },
  ]

  return (
    <motion.div
      className="relative"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-3 -z-10 rounded-xl border bg-muted/30 blur-xl"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
      />
      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-2xl shadow-foreground/5">
        <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-muted-foreground/40" />
            <span className="size-2.5 rounded-full bg-muted-foreground/40" />
            <span className="size-2.5 rounded-full bg-foreground/40" />
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {text.hero.previewLabel}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
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
                <motion.div
                  key={field.label}
                  className="rounded-lg border bg-background/70 p-3"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.38 + index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <p className="mb-1 text-xs text-muted-foreground">
                    {field.label}
                  </p>
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
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-md font-mono"
                dir="ltr"
              >
                GET /users
              </Badge>
              <Badge
                variant="outline"
                className="rounded-md font-mono"
                dir="ltr"
              >
                201 Created
              </Badge>
              <Badge
                variant="outline"
                className="rounded-md font-mono"
                dir="ltr"
              >
                JSON
              </Badge>
            </div>
          </div>

          <div className="bg-background/60 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {text.hero.responseLabel}
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <motion.span
                  className="size-2 rounded-full bg-foreground"
                  animate={
                    reduceMotion
                      ? undefined
                      : { scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {text.hero.responseTime}
              </div>
            </div>

            <motion.div
              className="rounded-lg border bg-zinc-950 p-4 text-left shadow-inner"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.52, ease: "easeOut" }}
            >
              <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                <Braces className="size-4 text-zinc-100" />
                <span>{text.hero.fieldBody}</span>
              </div>
              <pre
                dir="ltr"
                className={cn(
                  "overflow-hidden whitespace-pre-wrap font-mono text-xs leading-6 text-zinc-100 sm:text-sm",
                  isRtl && "text-left",
                )}
              >{`{
  "id": "usr_1048",
  "name": "Mina Carter",
  "role": "tester",
  "flags": ["demo", "ready"],
  "createdAt": "2026-05-26T09:42:00Z"
}`}</pre>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
