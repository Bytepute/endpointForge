import { Button } from "#/components/ui/button"
import { Check, Copy } from "lucide-react"

type CopyUrlButtonProps = {
  handleCopyUrl: () => void
  copied: boolean
}

export default function CopyUrlButton({
  handleCopyUrl,
  copied,
}: CopyUrlButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopyUrl}
      className="flex-1 md:flex-none"
    >
      {copied ? (
        <Check className="mr-2 h-4 w-4" />
      ) : (
        <Copy className="mr-2 h-4 w-4" />
      )}
      {copied ? "Copied!" : "Copy URL"}
    </Button>
  )
}
