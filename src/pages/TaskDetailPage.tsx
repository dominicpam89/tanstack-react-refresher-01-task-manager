import { tasksApi, tasksKeys } from '@/api/task'
import AlertUI from '@/components/AlertUI'
import LoadingUI from '@/components/Loading'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const taskId = Number(id)
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: tasksKeys.detail(taskId),
    queryFn: () => tasksApi.getTask(taskId.toString()),
    enabled: !isNaN(taskId),
  })

  if (isLoading) {
    return <LoadingUI />
  }
  if (error) {
    return <AlertUI title={error.name || "Couldn't get Task"} description="Something went wrong!" />
  }
  if (!task) {
    return <div className="p-8 text-center">Task not found.</div>
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="text-muted-foreground">{task.description || 'No description'}</p>
      <div className="mt-6">
        <span
          className={`px-2 py-1 rounded text-sm ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  )
}
