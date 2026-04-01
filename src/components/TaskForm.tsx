import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SpinnerCustom } from './ui/spinner-custom'

export default function TaskForm() {
  return (
    <Card className="p-2 md:p-12 gap-6">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Fill in the details to create a new task.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="task-name" className="hidden">
            Task Name
          </Label>
          <Input name="task-name" id="task-name" placeholder="Task Name here" />
          <Label htmlFor="task-description" className="hidden">
            Task Description
          </Label>
          <Input
            name="task-description"
            id="task-description"
            placeholder="Task Description here"
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" className="px-6 py-4 cursor-pointer">
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
