import type { TaskFormValues } from '@/features/tasks/task-form-schema'
import TaskList from '@/features/tasks/components/TaskList'
import { useCreateTask, useTasks } from '@/features/hooks/useTasks'
import { Button } from '@/components/ui/button'
import TaskForm from '@/features/tasks/components/TaskForm'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from '@/components/ui/drawer'
import { useState } from 'react'
import AlertUI from '@/components/AlertUI'

export default function TasksPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onDrawerClose = () => setDrawerOpen(false)
  const getTasks = useTasks()
  const createTask = useCreateTask()
  const onSubmit = async (data: TaskFormValues) => {
    await createTask.mutateAsync({ ...data, completed: false })
    if (createTask.isSuccess) {
      onDrawerClose()
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <Drawer
        direction="top"
        open={drawerOpen}
        onOpenChange={(open) => setDrawerOpen(open)}
        dismissible={false}
      >
        <DrawerHeader>
          <DrawerTitle>Add New Task</DrawerTitle>
          <DrawerDescription>Fill in the form and submit to create new task</DrawerDescription>
        </DrawerHeader>
        <DrawerTrigger asChild>
          <Button>Add Task</Button>
        </DrawerTrigger>
        <DrawerContent className="py-24 px-12 lg:px-64">
          {createTask.isError && (
            <AlertUI title="Failed Create Task!" description="Please try again later!" closable />
          )}
          <TaskForm
            isSubmitting={createTask.status}
            onSubmit={onSubmit}
            submitLabel="Create Task"
            onDrawerClose={onDrawerClose}
          />
        </DrawerContent>
      </Drawer>
      <TaskList
        tasks={getTasks.data || []}
        isLoading={getTasks.isLoading}
        isError={getTasks.isError}
        error={getTasks.error}
      />
    </div>
  )
}
