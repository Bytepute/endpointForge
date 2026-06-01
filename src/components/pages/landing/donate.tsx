import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"
import { useLandingI18n } from "./landing-i18n"
import { motion, useReducedMotion } from "framer-motion"

export default function Donate() {
  const { text } = useLandingI18n()
  const reduceMotion = useReducedMotion()

  return (
    <section id="donate" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        className="rounded-lg border bg-card/80 p-6 shadow-sm sm:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <motion.div
              className="flex size-10 items-center justify-center rounded-md border bg-background text-foreground"
              whileHover={
                reduceMotion ? undefined : { rotate: -6, scale: 1.04 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Sparkles className="size-5" />
            </motion.div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {text.donate.title}
            </h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              {text.donate.description}
            </p>
          </div>

          <a
            href="https://daramet.com/bytepute"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="h-11 px-5">
              <Heart className="size-4" />
              {text.donate.cta}
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
