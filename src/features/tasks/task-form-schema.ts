import { z } from 'zod'

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema>
const taskFormDefaultValues: TaskFormValues = {
  title: '',
  description: '',
}
export { taskFormSchema, type TaskFormValues, taskFormDefaultValues }
