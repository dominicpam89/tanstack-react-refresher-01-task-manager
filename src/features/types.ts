export interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
}

export type CreateTaskInput = Omit<Task, 'id'>
export type UpdateTaskInput = Partial<CreateTaskInput> & { id: number }
