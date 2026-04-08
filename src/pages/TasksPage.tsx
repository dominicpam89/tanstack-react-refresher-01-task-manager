import type { TaskFormValues } from '@/features/tasks/task-form-schema'
import TaskForm from '@/features/tasks/components/TaskForm'

export default function TasksPage() {
  const onSubmit = (data: TaskFormValues) => {
    console.log(data)
  }
  return (
    <div>
      <TaskForm onSubmit={onSubmit} isSubmitting="pending" />
    </div>
  )
}
