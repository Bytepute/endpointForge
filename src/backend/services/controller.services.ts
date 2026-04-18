import type { CreateController } from "#/schemas/create-controller-schema"
import type { ControllerDTO } from "../dtos/controller.dto"
import { sleep } from "./shared.services"

// TODO: remove mock data
let mockControllers: ControllerDTO[] = [
  {
    id: "1",
    projectId: "p1",
    name: "User Controller",
    basePath: "/user",
    createdAt: new Date().toISOString(),
    endpoints: ["GET /user", "POST /user"],
  },
  {
    id: "2",
    projectId: "p2",
    name: "Weather Controller",
    basePath: "/weather",
    createdAt: new Date().toISOString(),
    endpoints: ["GET /user", "POST /user"],
  },
]

export async function getControllersByProject(
  projectId: string,
): Promise<ControllerDTO[]> {
  await sleep()
  return mockControllers.filter((item) => item.projectId === projectId)
}

export async function getControllerById(
  controllerId: string,
): Promise<ControllerDTO | undefined> {
  await sleep()
  return mockControllers.find((item) => item.id === controllerId)
}

export async function createController(
  data: CreateController,
): Promise<ControllerDTO[]> {
  await sleep()

  // TODO: Add Data Converter
  const newController = {
    id: Math.random().toString(36).slice(2),
    projectId: "p1", // mock for now
    name: data.path.replace("/", "") + " Controller", // example mock
    basePath: data.path,
    createdAt: new Date().toISOString(),
    endpoints: [],
  }
  mockControllers = [...mockControllers, newController]
  return mockControllers
}

export async function deleteController(id: string): Promise<ControllerDTO[]> {
  await sleep()
  mockControllers = mockControllers.filter((c) => c.id !== id)
  return mockControllers
}
