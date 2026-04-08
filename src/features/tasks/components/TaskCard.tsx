import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface TaskCardProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  cardTitle?: string
  cardDescription?: string
}

export default function TaskCard({
  children,
  header = <></>,
  footer = <></>,
  cardTitle,
  cardDescription,
}: TaskCardProps) {
  return (
    <Card className="p-2 md:p-12 gap-6">
      {header}
      <CardHeader>
        <CardTitle>{cardTitle || 'Untitled'}</CardTitle>
        <CardDescription>{cardDescription || ''}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex gap-2 justify-end">{footer}</CardFooter>
    </Card>
  )
}
