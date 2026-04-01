import { tasksKeys, tasksApi } from '@/api/task'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TaskUpdateSchema } from '@/features/tasks/types'
import type { Task } from '@/features/types'

export const useTasks = () => {
  return useQuery({
    queryKey: [...tasksKeys.lists()],
    queryFn: tasksApi.getTasks,
  })
}

export const useTask = (id: string) => {
  return useQuery({
    queryKey: tasksKeys.detail(Number(id)),
    queryFn: () => tasksApi.getTask(id),
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() })
    },
    onError: (error) => {
      return error
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updatedTask }: { id: string; updatedTask: TaskUpdateSchema }) =>
      tasksApi.updateTask(id, updatedTask),
    onSuccess: (_, variables) => {
      // Invalidate the list and the specific detail
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(Number(variables.id)) })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string }) => tasksApi.deleteTask(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: tasksKeys.lists() })
      const previousTasks = queryClient.getQueryData(tasksKeys.lists())
      queryClient.setQueryData(tasksKeys.lists(), (old: Task[]) => {
        if (!old) return []
        return old.filter((task) => task.id !== Number(id))
      })
      return { previousTasks }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() })
    },
    onError: (error, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(tasksKeys.lists(), context.previousTasks)
      }
      return error
    },
  })
}
