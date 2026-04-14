import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
})

export const CreateProjectInputSchema = z.object({
  name: z.string().min(1, 'Project name is required!'),
  description: z.string().optional(),
})

export const ProjectsListSchema = z.array(ProjectSchema)

export type Project = z.infer<typeof ProjectSchema>
export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>
