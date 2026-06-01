import { motion, useReducedMotion } from "framer-motion"
import { useLandingI18n } from "./landing-i18n"
import MockApiPreviewGlow from "./mock-api-preview-glow"
import MockApiPreviewToolbar from "./mock-api-preview-toolbar"
import MockApiRequestPanel from "./mock-api-request-panel"
import MockApiResponsePanel from "./mock-api-response-panel"
import type { RequestField } from "./mock-api-preview-types"

export default function MockApiPreview() {
  const { text, isRtl } = useLandingI18n()
  const reduceMotion = useReducedMotion()
  const fields: Array<RequestField> = [
    { id: "method", label: text.hero.fieldMethod, value: "POST", accent: true },
    { id: "path", label: text.hero.fieldPath, value: text.hero.endpointPath },
    {
      id: "status",
      label: text.hero.fieldStatus,
      value: text.hero.statusText,
    },
  ]

  return (
    <motion.div
      className="relative"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <MockApiPreviewGlow reduceMotion={reduceMotion} />

      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-2xl shadow-foreground/5">
        <MockApiPreviewToolbar label={text.hero.previewLabel} />

        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <MockApiRequestPanel fields={fields} />
          <MockApiResponsePanel isRtl={isRtl} reduceMotion={reduceMotion} />
        </div>
      </div>
    </motion.div>
  )
}
