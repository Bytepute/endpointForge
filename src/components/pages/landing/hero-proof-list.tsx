import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useLandingI18n } from "./landing-i18n"

type HeroProofListProps = {
  reduceMotion: boolean | null
}

export default function HeroProofList({ reduceMotion }: HeroProofListProps) {
  const { text } = useLandingI18n()
  const items = [
    text.hero.proofNoBackend,
    text.hero.proofJson,
    text.hero.proofTesting,
  ]

  return (
    <motion.div
      className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3"
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 18 },
        show: reduceMotion ? {} : { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {items.map((item) => (
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
  )
}
