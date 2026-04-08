import { Button } from '@/components/ui/button'
import { SpinnerCustom } from '@/components/ui/spinner-custom'
import {
  taskFormSchema,
  taskFormDefaultValues,
  type TaskFormValues,
} from '@/features/tasks/task-form-schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputText from '@/components/input-form/InputText'
import InputTextArea from '@/components/input-form/InputTextArea'
import { useCallback } from 'react'
import TaskCard from './TaskCard'

interface TaskFormProps {
  defaultValues?: Partial<TaskFormValues>
  onSubmit: (data: TaskFormValues) => void
  isSubmitting: 'pending' | 'success' | 'error' | 'idle'
  submitLabel?: string
}

export default function TaskForm({
  defaultValues = taskFormDefaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Create',
}: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const onReset = useCallback(() => form.reset(), [form])
  return (
    <TaskCard
      cardTitle="Task Card"
      cardDescription="Fill in the details of the task you want to create"
      footer={
        <>
          <Button variant="outline" className="px-6 py-4 cursor-pointer" onClick={onReset}>
            Reset
          </Button>
          <Button
            size="lg"
            className="px-6 py-4 cursor-pointer"
            disabled={isSubmitting === 'pending'}
          >
            {isSubmitting === 'pending' && <SpinnerCustom />}
            {submitLabel}
          </Button>
        </>
      }
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-center gap-4"
        id="task-form"
      >
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
    </TaskCard>
  )
}
