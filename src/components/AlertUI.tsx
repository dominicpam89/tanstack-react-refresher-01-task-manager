import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
import { AlertCircleIcon, CircleXIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface AlertUIProps {
  icon?: React.ReactNode
  title: string
  description?: string
  closable?: boolean
}

export default function AlertUI({ icon, title, description, closable = false }: AlertUIProps) {
  const [show, setShow] = useState(true)
  const onClose = () => setShow(false)
  if (!show) return <></>
  return (
    <Alert variant="destructive" className="w-full">
      {icon || <AlertCircleIcon />}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
      {closable && (
        <AlertAction>
          <Button size="icon-lg" variant="destructive" onClick={onClose}>
            <CircleXIcon />
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
