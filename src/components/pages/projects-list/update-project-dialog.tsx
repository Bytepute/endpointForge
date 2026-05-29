import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form"
import {
  UpdateProjectInputSchema
  
  
} from "#/schemas/projects.schema"
import type {ProjectModel, UpdateProjectInput} from "#/schemas/projects.schema";
import { useUpdateProject } from "#/hooks/use-update-project"

type UpdateProjectDialogProps = {
  project: ProjectModel
  onClose: () => void
}

export function UpdateProjectDialog({
  project,
  onClose,
}: UpdateProjectDialogProps) {
  const updateMutation = useUpdateProject(project.id)

  const form = useForm<UpdateProjectInput>({
    resolver: zodResolver(UpdateProjectInputSchema),
    values: {
      name: project.name,
      description: project.description ?? "",
    },
  })

  const onSubmit = (data: UpdateProjectInput) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        onClose()
        form.reset()
      },
    })
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full"
            >
              {updateMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Project"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
