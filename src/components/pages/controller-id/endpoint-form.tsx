import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
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
import CodeMirrorEditorLazy from "../shared/code-mirror-editor-lazy"
import type {
  CreateEndpointType,
  UpdateEndpointType,
} from "#/schemas/endpoint-schema"
import type { UseFormReturn } from "react-hook-form"
import { useTheme } from "#/hooks/use-theme"
import { withLeadingSlash } from "#/lib/utils"

type EndpointFormValues = CreateEndpointType | UpdateEndpointType

interface EndpointFormProps {
  form: UseFormReturn<EndpointFormValues>
  onSubmit: (values: EndpointFormValues) => void
  basePath?: string
  submitLabel: string
  isSubmitting: boolean
  onCancel?: () => void
}

export function EndpointForm({
  form,
  onSubmit,
  basePath,
  submitLabel,
  isSubmitting,
  onCancel,
}: EndpointFormProps) {
  const { theme } = useTheme()

  return (
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
              <FormLabel>
                Path {basePath && `(relative to ${basePath})`}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="/items"
                  {...field}
                  onChange={(e) =>
                    field.onChange(withLeadingSlash(e.target.value))
                  }
                />
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
          name="delay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delay (ms)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Optional network delay"
                  value={field.value}
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
          name="responseBody"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response JSON</FormLabel>
              <FormControl>
                <CodeMirrorEditorLazy
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  theme={theme}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
