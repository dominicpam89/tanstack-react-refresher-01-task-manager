import type { TaskFormValues } from '@/features/tasks/task-form-schema'
import TaskForm from '@/features/tasks/components/TaskForm'
import TaskList from '@/features/tasks/components/TaskList'
import type { Task } from '@/features/types'

const tasksMock: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false },
]

export default function TasksPage() {
  const onSubmit = (data: TaskFormValues) => {
    console.log(data)
  }
  return (
    <div className="flex flex-col gap-4">
      <TaskList tasks={tasksMock} isLoading={false} />
      <TaskForm onSubmit={onSubmit} isSubmitting="idle" />
    </div>
  )
}
