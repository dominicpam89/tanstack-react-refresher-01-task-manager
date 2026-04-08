import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  ControllerFieldState,
} from 'react-hook-form'

interface Props<K extends FieldValues, T extends Path<K>> {
  field: ControllerRenderProps<K, T>
  fieldState: ControllerFieldState
  label?: string
  description?: string
  id: string
  placeholder: string
}

export default function InputTextArea<K extends FieldValues, T extends Path<K>>({
  field,
  fieldState,
  label,
  description,
  id,
  placeholder,
}: Props<K, T>) {
  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Textarea
        {...field}
        id={id}
        placeholder={placeholder}
        aria-invalid={fieldState.invalid}
        rows={3}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
