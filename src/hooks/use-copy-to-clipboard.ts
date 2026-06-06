import { useCallback, useState } from "react"
import { notificationService } from "#/services/notification.service.ts"

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string, successMessage = "Copied to clipboard") => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          const textarea = document.createElement("textarea")
          textarea.value = text

          textarea.style.position = "fixed"
          textarea.style.left = "-9999px"
          textarea.style.top = "0"

          document.body.appendChild(textarea)

          textarea.focus()
          textarea.select()

          const successful = document.execCommand("copy")

          document.body.removeChild(textarea)

          if (!successful) {
            throw new Error("Copy command failed")
          }
        }

        setCopied(true)
        notificationService.success(successMessage)

        window.setTimeout(() => {
          setCopied(false)
        }, resetDelay)
      } catch (error) {
        notificationService.error("Failed to copy")
        console.error(error)
      }
    },
    [resetDelay],
  )

  return { copied, copy }
}
