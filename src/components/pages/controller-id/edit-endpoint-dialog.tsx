import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useUpdateEndpoint } from "#/hooks/use-update-endpoint"
import type { EndpointModel } from "#/models/endpoint-model"
import {
  createEndpointSchema,
  type UpdateEndpointType,
} from "#/schemas/endpoint-schema"
import { EndpointForm } from "./endpoint-form"

type Props = {
  endpoint: EndpointModel
  onClose: () => void
}

export default function EditEndpointDialog({ endpoint, onClose }: Props) {
  const form = useForm<UpdateEndpointType>({
    resolver: zodResolver(createEndpointSchema),
    values: {
      method: endpoint.method,
      path: endpoint.path,
      statusCode: endpoint.statusCode.toString(),
      responseBody: JSON.stringify(endpoint.responseBody, null, 2),
      delay: endpoint.delay,
    },
  })

  const updateMutation = useUpdateEndpoint(String(endpoint.id))

  const onSubmit = (values: UpdateEndpointType) => {
    try {
      const responseBody = JSON.parse(values.responseBody)
      updateMutation.mutate(
        {
          method: values.method,
          path: values.path,
          statusCode: Number(values.statusCode),
          responseBody: responseBody,
          delay: values.delay,
        },
        {
          onSuccess: () => {
            onClose()
            form.reset()
          },
        },
      )
    } catch (error) {
      form.setError("responseBody", {
        type: "manual",
        message: "Invalid JSON format",
      })
    }
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Endpoint</DialogTitle>
        </DialogHeader>
        <EndpointForm
          form={form}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          isSubmitting={updateMutation.isPending}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
