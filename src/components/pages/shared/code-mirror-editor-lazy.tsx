import { Skeleton } from "#/components/ui/skeleton"
import { lazy, Suspense } from "react"

const CodeMirrorEditor = lazy(() => import("./code-mirror-editor"))

interface Props {
  value: string
  onChange: (value: string) => void
  theme: "dark" | "light"
}

export default function CodeMirrorEditorLazy(props: Props) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-6" />}>
      <CodeMirrorEditor {...props} />
    </Suspense>
  )
}
