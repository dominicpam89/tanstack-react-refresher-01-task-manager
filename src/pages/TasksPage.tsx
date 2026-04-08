import type { TaskFormValues } from '@/features/tasks/task-form-schema'
import TaskList from '@/features/tasks/components/TaskList'
import type { Task } from '@/features/types'
import { useCreateTask, useTasks } from '@/features/hooks/useTasks'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon } from 'lucide-react'
import TaskForm from '@/features/tasks/components/TaskForm'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { useState } from 'react'

const tasksMock: Task[] = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false },
]

export default function TasksPage() {
  const { data: error } = useTasks()
  const createTask = useCreateTask()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onSubmit = async (data: TaskFormValues) => {
    await createTask.mutateAsync({ ...data, completed: false })
  }
  const onDrawerClose = () => setDrawerOpen(false)
  if (error) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertCircleIcon />
        <AlertTitle>Tasks Loaded Failed!</AlertTitle>
        <AlertDescription>
          Tasks could not be loaded. Please contact your developer and try again.
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <Drawer
        direction="top"
        open={drawerOpen}
        onOpenChange={(open) => setDrawerOpen(open)}
        dismissible={false}
      >
        <DrawerTrigger asChild>
          <Button>Add Task</Button>
        </DrawerTrigger>
        <DrawerContent className="py-24 px-12 lg:px-64">
          <TaskForm
            isSubmitting={createTask.status}
            onSubmit={onSubmit}
            submitLabel="Create Task"
            onDrawerClose={onDrawerClose}
          />
        </DrawerContent>
      </Drawer>
      <TaskList tasks={tasksMock} isLoading={false} />
    </div>
  )
}
