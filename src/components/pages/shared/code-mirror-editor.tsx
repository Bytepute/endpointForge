import { useEffect, useRef } from "react"
import { Compartment } from "@codemirror/state"
import { json } from "@codemirror/lang-json"
import { EditorView } from "@codemirror/view"
import { basicSetup } from "codemirror"
import { oneDark } from "@codemirror/theme-one-dark"

interface CodeMirrorEditorProps {
  value: string
  onChange: (value: string) => void
  theme: "dark" | "light"
}

const themeCompartment = new Compartment()

export default function CodeMirrorEditor({
  value,
  onChange,
  theme,
}: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    const view = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        json(),

        themeCompartment.of(theme === "dark" ? oneDark : []),

        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString())
          }
        }),
      ],
      parent: editorRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [])

  useEffect(() => {
    if (!viewRef.current) return

    viewRef.current.dispatch({
      effects: themeCompartment.reconfigure(theme === "dark" ? oneDark : []),
    })
  }, [theme])

  useEffect(() => {
    if (!viewRef.current) return

    const currentValue = viewRef.current.state.doc.toString()

    if (currentValue !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: value,
        },
      })
    }
  }, [value])

  return (
    <div
      ref={editorRef}
      className="border rounded-md overflow-hidden"
      style={{ height: "100%" }}
    />
  )
}
