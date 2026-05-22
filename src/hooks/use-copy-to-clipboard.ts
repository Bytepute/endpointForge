import { useCallback, useState } from "react"
import { notificationService } from "#/services/notification.service.ts"

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string, successMessage = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        notificationService.success(successMessage)
        setTimeout(() => setCopied(false), resetDelay)
      } catch {
        notificationService.error("Failed to copy")
      }
    },
    [resetDelay],
  )

  return { copied, copy }
}
