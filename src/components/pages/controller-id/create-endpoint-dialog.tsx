import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog"

import { Button } from "#/components/ui/button"
import { useCreateEndpoint } from "#/hooks/use-create-endpoint"

import {
  createEndpointSchema,
  type CreateEndpointType,
} from "#/schemas/endpoint-schema"
import { EndpointForm } from "./endpoint-form"

type Props = {
  basePath: string
  controllerId: string
}

export function CreateEndpointDialog({ basePath, controllerId }: Props) {
  const createEndpoint = useCreateEndpoint(controllerId)

  const [open, setOpen] = useState(false)

  const form = useForm<CreateEndpointType>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      method: "GET",
      path: "",
      statusCode: "200",
      responseBody: "{}",
      delay: 0,
    },
  })

  const onSubmit = (values: CreateEndpointType) => {
    createEndpoint.mutate(values, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Endpoint</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Endpoint</DialogTitle>
        </DialogHeader>

        <EndpointForm
          form={form}
          onSubmit={onSubmit}
          basePath={basePath}
          submitLabel="Create"
          isSubmitting={createEndpoint.isPending}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
