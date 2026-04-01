import { z } from 'zod'
import type { UpdateTaskInput } from '../types'

export const TaskUpdateSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  completed: z.boolean(),
})

export type TaskUpdateSchema = z.infer<typeof TaskUpdateSchema>
