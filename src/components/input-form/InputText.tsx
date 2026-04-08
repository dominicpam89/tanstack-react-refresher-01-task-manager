import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form'

interface Props<K extends FieldValues, T extends Path<K>> {
  field: ControllerRenderProps<K, T>
  fieldState: ControllerFieldState
  label?: string
  description?: string
  placeholder: string
}

export default function InputText<K extends FieldValues, T extends Path<K>>({
  field,
  fieldState,
  label,
  description,
  placeholder,
}: Props<K, T>) {
  return (
    <Field data-invalid={fieldState.invalid}>
      {label && (
        <FieldLabel htmlFor="name" className="hidden">
          {label}
        </FieldLabel>
      )}
      <Input
        {...field}
        id="name"
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        placeholder={placeholder}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
