import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseMutationResult } from '@tanstack/react-query'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

import {
  CreateProjectInputSchema,
  type CreateProjectInput,
} from '#/schemas/projects.schema'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'

type ProjectsFormProps = {
  handleCreateProject: (projectData: CreateProjectInput) => void
  createMutation: UseMutationResult<
    { id: string; name: string; createdAt: string },
    Error,
    CreateProjectInput,
    unknown
  >
}

export default function ProjectsDialog({
  handleCreateProject,
  createMutation,
}: ProjectsFormProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectInputSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: CreateProjectInput) => {
    handleCreateProject(data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
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
              disabled={createMutation.isPending}
              className="w-full"
            >
              {createMutation.isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
