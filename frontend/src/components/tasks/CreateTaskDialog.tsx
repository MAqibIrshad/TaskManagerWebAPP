import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import TaskForm from "./TaskForm"
interface Props {
  addTask: (
    title: string,
    description:string,
    category_id: number
  ) => void

  isPending: boolean
}

export default function CreateTaskDialog({
  addTask,
  isPending,
}: Props) {
  return (
    <div className="m-3">
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
  Create Task
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
    </div>
  )
}