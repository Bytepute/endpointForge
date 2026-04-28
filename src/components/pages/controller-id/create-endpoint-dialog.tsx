import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "#/components/ui/dialog"

import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import Editor from "@monaco-editor/react"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "#/components/ui/select"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "#/components/ui/form"
import {
  createEndpointSchema,
  type CreateEndpointFormValues,
} from "#/schemas/create-endpoint-schema"
import { Switch } from "#/components/ui/switch"
import { useCreateEndpoint } from "#/hooks/use-create-endpoint"
import { Loader2 } from "lucide-react"
import { useTheme } from "#/hooks/use-theme"

type Props = {
  basePath: string
  controllerId: string
}

export function CreateEndpointDialog({ basePath, controllerId }: Props) {
  const { mutateAsync: createEndpointMutation, isPending } =
    useCreateEndpoint(controllerId)
  const theme = useTheme()

  const [open, setOpen] = useState(false)

  const form = useForm<CreateEndpointFormValues>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      method: "GET",
      path: "",
      statusCode: "200",
      responseJson: "{}",
      delayMs: 0,
      enabled: true,
    },
  })

  const onSubmit = async (values: CreateEndpointFormValues) => {
    try {
      await createEndpointMutation(values)
      form.reset()
      setOpen(false)
    } catch (err) {
      console.error("Failed to create endpoint", err)
    }
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select HTTP method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormLabel>Path (relative to {basePath})</FormLabel>
                  <FormControl>
                    <Input placeholder="/items" {...field} />
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
                    <Input type="number" placeholder="200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delayMs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delay (ms)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Optional network delay"
                      value={field.value.toString()}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Delay applied before returning this response.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-3 border rounded-md">
                  <div className="space-y-1">
                    <FormLabel className="text-base">Enabled</FormLabel>
                    <FormDescription>
                      Toggle whether this endpoint is active.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
                    <div className="border rounded-md overflow-hidden">
                      <Editor
                        height="200px"
                        defaultLanguage="json"
                        value={field.value}
                        onChange={(value) => field.onChange(value || "{}")}
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
