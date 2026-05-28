import { motion } from "framer-motion"

type MockApiPreviewGlowProps = {
  reduceMotion: boolean | null
}

export default function MockApiPreviewGlow({
  reduceMotion,
}: MockApiPreviewGlowProps) {
  return (
    <motion.div
      className="absolute -inset-3 -z-10 rounded-xl border bg-muted/30 blur-xl"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
    />
  )
}
