import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "#/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "#/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useUpdateEndpoint } from "#/hooks/use-update-endpoint"
import { useTheme } from "#/hooks/use-theme"
import { Editor } from "@monaco-editor/react"
import type { EndpointModel } from "#/models/endpoint-model"
import {
  createEndpointSchema,
  type UpdateEndpointType,
} from "#/schemas/endpoint-schema"

type Props = {
  endpoint: EndpointModel
  onClose: () => void
}

export default function EditEndpointDialog({ endpoint, onClose }: Props) {
  const theme = useTheme()

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
                    <Input type="number" {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responseBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response JSON</FormLabel>
                  <FormControl>
                    <div className="border rounded-md overflow-hidden">
                      <Editor
                        key={endpoint.id}
                        height="200px"
                        defaultLanguage="json"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        theme={theme === "dark" ? "vs-dark" : "vs-light"}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          folding: true,
                          automaticLayout: true,
                          formatOnPaste: true,
                          formatOnType: true,
                          tabSize: 2,
                          overviewRulerLanes: 0,
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
