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
      <Button className="gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 transition hover:shadow-lg hover:shadow-indigo-500/30">
        <PlusCircle className="h-4 w-4" />
        Create Task
      </Button>
    )}
  </DialogTrigger>

  <DialogContent className="max-w-lg overflow-hidden rounded-3xl border-0 bg-white/95 p-0 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl dark:bg-slate-900/95 dark:shadow-indigo-800/10">
    {/* Delicate gradient header — blue → indigo → purple */}
    <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-transparent px-8 py-6 dark:from-indigo-950/30 dark:via-violet-950/20 dark:to-transparent">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-100">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
            <PlusCircle className="h-5 w-5" />
          </span>
          Create Task
        </DialogTitle>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Add a new task to your board — details and a category.
        </p>
      </DialogHeader>
    </div>

    {/* Form body */}
    <div className="px-8 pb-8 pt-2">
      <TaskForm addTask={addTask} isSubmitting={isPending} />
    </div>
  </DialogContent>
</Dialog>
  )
}