import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import type { Task } from '@/features/types'
import { Button } from '@/components/ui/button'
import TaskCard from './TaskCard'
import { useDeleteTask } from '@/features/hooks/useTasks'
import LoadingUI from '@/components/Loading'
import AlertUI from '@/components/AlertUI'

interface TaskListProps {
  tasks: Task[]
  isLoading?: boolean
  isError?: boolean
  error: Error | null
}

interface TaskProps {
  task: Task
}

export default function TaskList({ tasks, isLoading, isError, error }: TaskListProps) {
  if (isLoading) {
    return <LoadingUI />
  }
  if (isError) {
    return (
      <AlertUI
        title={error?.name || 'Tasks Loaded Failed!'}
        description="Tasks could not be loaded. Please contact your developer and try again."
        closable
      />
    )
  }
  if (tasks.length === 0) {
    return (
      <TaskCard cardTitle="No Task" cardDescription="There's no task yet.">
        <div className="text-center text-muted-foreground">No tasks yet. Create one!</div>
      </TaskCard>
    )
  }
  return (
    <TaskCard cardTitle="Task List" cardDescription="Here are the tasks you have created">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </TaskCard>
  )
}

function Task({ task }: TaskProps) {
  const deleteTask = useDeleteTask()
  return (
    <div className="flex w-full max-w-md flex-col gap-6 my-2">
      <Item variant={deleteTask.status === 'pending' ? 'muted' : 'outline'}>
        <ItemContent>
          <ItemTitle>{task.title}</ItemTitle>
          <ItemDescription>{task.description || ''}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteTask.mutate({ id: task.id.toString() })}
            disabled={deleteTask.isPending}
          >
            Delete
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
