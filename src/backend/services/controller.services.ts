import type { ControllerDTO } from '../dtos/controller.dto'
import { sleep } from './shared.services'

// TODO: remove mock data
const mockControllers: ControllerDTO[] = [
  {
    id: '1',
    projectId: 'p1',
    name: 'User Controller',
    basePath: '/user',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    projectId: 'p1',
    name: 'Weather Controller',
    basePath: '/weather',
    createdAt: new Date().toISOString(),
  },
]

export async function getControllerByProject(
  projectId: string,
): Promise<ControllerDTO | undefined> {
  await sleep()
  return mockControllers.find((item) => item.id === projectId)
}
