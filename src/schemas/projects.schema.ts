import { z } from "zod"

export const ProjectMockServerStatusSchema = z.object({
  status: z.enum(["FAILED", "SUCCESS"]),
})

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  port: z.number(),
  isProjectRunning: z.boolean(),
})

export const CreateProjectInputSchema = z.object({
  name: z.string().min(1, "Project name is required!"),
  description: z.string().optional(),
})

export const UpdateProjectInputSchema = z.object({
  name: z.string().min(1, "Project name is required!"),
  description: z.string().optional(),
})

export const ProjectsListSchema = z.array(ProjectSchema)

export type ProjectModel = z.infer<typeof ProjectSchema>
export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>
export type UpdateProjectInput = z.infer<typeof UpdateProjectInputSchema>
export type ProjectMockServerStatus = z.infer<
  typeof ProjectMockServerStatusSchema
>
