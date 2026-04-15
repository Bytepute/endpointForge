import type { CreateProjectInput } from "#/hooks/use-projects" // or wherever

import type { Project } from "#/schemas/projects.schema"

let projects: Project[] = [
  {
    id: "1",
    name: "Weather App",
    description: "A weather app",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Train Stations",
    description: "A train app",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Online Shop",
    description: "A online shop",
    createdAt: new Date().toISOString(),
  },
]

export const getProjects = async (): Promise<Project[]> => {
  return Promise.resolve(projects)
}

export const createProject = async (
  input: CreateProjectInput,
): Promise<Project> => {
  const newProject = {
    id: Date.now().toString(),
    name: input.name,
    description: input.description,
    createdAt: new Date().toISOString(),
  }

  projects.push(newProject)
  return Promise.resolve(newProject)
}

export const deleteProject = async (projectId: string): Promise<void> => {
  projects = projects.filter((project) => project.id !== projectId)

  return Promise.resolve()
}
