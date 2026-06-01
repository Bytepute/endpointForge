import { cn } from "#/lib/utils"
import { Braces } from "lucide-react"
import { motion } from "framer-motion"
import { useLandingI18n } from "./landing-i18n"

type MockApiResponsePanelProps = {
  isRtl: boolean
  reduceMotion: boolean | null
}

export default function MockApiResponsePanel({
  isRtl,
  reduceMotion,
}: MockApiResponsePanelProps) {
  const { text } = useLandingI18n()

  return (
    <div className="bg-background/60 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {text.hero.responseLabel}
        </p>
        <ResponseTime reduceMotion={reduceMotion} />
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
  )
}

function ResponseTime({ reduceMotion }: { reduceMotion: boolean | null }) {
  const { text } = useLandingI18n()

  return (
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
  )
}
