import { Button } from "#/components/ui/button"
import { ArrowLeft, Check, Copy, Pencil, Trash2 } from "lucide-react"
import { ConfirmDialog } from "#/components/pages/shared/confirm-dialog"
import { useCopyToClipboard } from "#/hooks/use-copy-to-clipboard"
import type { EndpointModel } from "#/models/endpoint-model"

type EndpointHeaderProps = {
  endpoint: EndpointModel
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export function EndpointHeader({
  endpoint,
  onBack,
  onEdit,
  onDelete,
}: EndpointHeaderProps) {
  const { copied, copy } = useCopyToClipboard()

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/api${endpoint.path}`
    copy(url, "URL copied to clipboard")
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-full md:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Controller
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex-1 md:flex-none"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <ConfirmDialog
          trigger={
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 md:flex-none"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          }
          onConfirm={onDelete}
        />
      </div>
    </div>
  )
}
