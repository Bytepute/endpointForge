import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '#/components/ui/select'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '#/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { EndpointDTO } from '#/backend/dtos/endpoint.dto'
import {
  createEndpointSchema,
  type CreateEndpointFormValues,
} from '#/schemas/create-endpoint-schema'
import { useUpdateEndpoint } from '#/hooks/use-update-endpoint'

type Props = {
  endpoint: EndpointDTO
}

export function EditEndpointDialog({ endpoint }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateEndpointFormValues>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      method: endpoint.method,
      path: endpoint.path,
      statusCode: endpoint.statusCode.toString(),
      responseJson: JSON.stringify(endpoint.responseJson, null, 2),
      delayMs: endpoint.delayMs ?? 0,
      enabled: endpoint.enabled ?? true,
    },
  })

  const updateMutation = useUpdateEndpoint(endpoint.id)

  const onSubmit = async (values: CreateEndpointFormValues) => {
    try {
      const parsedJson = JSON.parse(values.responseJson)

      await updateMutation.mutateAsync({
        method: values.method,
        path: values.path,
        statusCode: Number(values.statusCode),
        responseJson: parsedJson,
        delayMs: values.delayMs,
        enabled: values.enabled,
      })

      setOpen(false)
    } catch (err) {
      console.error('Failed to update endpoint', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Endpoint</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input placeholder="/example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statusCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value?.toString() ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responseJson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response JSON</FormLabel>
                  <FormControl>
                    <Textarea className="font-mono" rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
