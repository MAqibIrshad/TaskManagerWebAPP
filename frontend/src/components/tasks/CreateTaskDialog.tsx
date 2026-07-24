import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TaskForm from "./TaskForm"

interface Props {
  addTask: (
    title: string,
    description: string,
    category_id: number
  ) => void
  isPending: boolean
  /** Optional custom trigger – uses a default orange button if not provided */
  trigger?: ReactNode
}

export default function CreateTaskDialog({
  addTask,
  isPending,
  trigger,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        {trigger ? (
          trigger
        ) : (
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Task
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          addTask={addTask}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}