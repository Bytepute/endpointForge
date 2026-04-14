import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProject,
  deleteProject,
  getProjects,
} from '#/backend/services/projects.service'
import type { Project } from '#/schemas/projects.schema'

export interface CreateProjectInput {
  name: string
  description?: string
}

export function useProjects() {
  const queryClient = useQueryClient()

  const {
    data: projects = [],
    error,
    isLoading,
  } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const createMutation = useMutation<Project, Error, CreateProjectInput>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const handleCreateProject = (projectToCreateData: CreateProjectInput) => {
    createMutation.mutate(projectToCreateData)
  }

  const handleDeleteProject = (projectId: string) => {
    deleteMutation.mutate(projectId)
  }

  return {
    projects,
    error,
    isLoading,
    createMutation,
    handleCreateProject,
    handleDeleteProject,
  }
}
