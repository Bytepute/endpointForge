import type { CreateProjectInput } from "#/hooks/use-projects" // or wherever

import type { Project } from "#/schemas/projects.schema"
import { sleep } from "./shared.services"

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

export async function getProjects(): Promise<Project[]> {
  await sleep()
  return [...projects]
}

export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  await sleep()

  const now = new Date().toISOString()
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description ?? "",
    createdAt: now,
  }

  projects = [...projects, newProject]
  return newProject
}

export async function deleteProject(projectId: string): Promise<void> {
  await sleep()
  projects = projects.filter((p) => p.id !== projectId)
}
