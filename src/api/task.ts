import type { Task, CreateTaskInput, UpdateTaskInput } from '@/features/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/api'

const fetchAPI = async <T>(endPoint: string, options?: RequestInit): Promise<T> => {
  const url = new URL(endPoint, API_URL).toString()
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  }
  try {
    const response = await fetch(url, { ...options, headers })
    if (!response.ok) {
      let errorMessage = response.statusText
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch (error) {}
      throw new Error(`Request Failed: (${response.status}: ${errorMessage})`)
    }
    if (response.status === 204) {
      return null as T
    }
    return (await response.json()) as T
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Network error: ${String(error)}`)
  }
}

const getTasks = async () => {
  return await fetchAPI<Task[]>('/tasks')
}

const getTask = async (id: string) => {
  return await fetchAPI<Task>('/tasks/' + encodeURIComponent(id))
}

const createTask = async (taskData: CreateTaskInput) => {
  return await fetchAPI<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  })
}

const updateTask = async (id: string, taskData: UpdateTaskInput) => {
  return await fetchAPI<Task>('/tasks/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(taskData),
  })
}

const deleteTask = async (id: string) => {
  await fetchAPI<void>('/tasks/' + encodeURIComponent(id), {
    method: 'DELETE',
  })
}

export { getTasks, getTask, createTask, updateTask, deleteTask }
