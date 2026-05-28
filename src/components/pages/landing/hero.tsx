import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"
import { useLandingI18n } from "./landing-i18n"
import { useAuthStore } from "#/stores/auth-store"
import { ArrowRight, Play } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import MockApiPreview from "./mock-api-preview"
import HeroBadge from "./hero-badge"
import HeroProofList from "./hero-proof-list"

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
            <HeroBadge label={text.hero.badge} />
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

          <HeroProofList reduceMotion={reduceMotion} />
        </motion.div>

        <MockApiPreview />
      </div>
    </section>
  )
}
