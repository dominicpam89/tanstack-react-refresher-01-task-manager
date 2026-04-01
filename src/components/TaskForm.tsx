import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SpinnerCustom } from './ui/spinner-custom'
import {
  taskFormSchema,
  taskFormDefaultValues as defaultValues,
  type TaskFormValues,
} from '@/features/tasks/task-form-schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputText from '@/components/TaskForm/InputText'
import InputTextArea from './TaskForm/InputTextArea'
import { useCallback } from 'react'

export default function TaskForm() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const onReset = useCallback(() => form.reset(), [form])
  return (
    <Card className="p-2 md:p-12 gap-6">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Fill in the details to create a new task.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid w-full items-center gap-4" id="task-form">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <InputText<TaskFormValues, 'title'>
                field={field}
                fieldState={fieldState}
                placeholder="Task Title"
              />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <InputTextArea<TaskFormValues, 'description'>
                field={field}
                fieldState={fieldState}
                id="description"
                placeholder="Task Description"
              />
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" className="px-6 py-4 cursor-pointer" onClick={onReset}>
          Reset
        </Button>
        <Button size="lg" className="px-6 py-4 cursor-pointer">
          <SpinnerCustom />
          Create Task
        </Button>
      </CardFooter>
    </Card>
  )
}
