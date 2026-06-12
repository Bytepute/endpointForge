import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form"

import { Loader2 } from "lucide-react"
import { useCreateController } from "#/hooks/use-create-controller"
import { CreateControllerSchema } from "#/schemas/create-controller-schema"
import type { CreateController } from "#/schemas/create-controller-schema"
import { withLeadingSlash } from "#/lib/utils"

type Props = {
  projectId: string
}

export default function CreateControllerDialog({ projectId }: Props) {
  const [open, setOpen] = useState(false)
  const controllerMutation = useCreateController(projectId)

  const form = useForm<CreateController>({
    resolver: zodResolver(CreateControllerSchema),
    defaultValues: {
      path: "",
    },
  })

  const onSubmit = (data: CreateController) => {
    controllerMutation.mutate(data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Controller</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Controller</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/example"
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

            <Button
              type="submit"
              disabled={controllerMutation.isPending}
              className="w-full"
            >
              {controllerMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Controller"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
