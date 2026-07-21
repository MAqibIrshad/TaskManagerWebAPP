import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, CheckCircle2, Circle } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

  type Task = {
  id: number
  title: string
  completed: boolean
  category: {
    id: number
    name: string
  } | null
}
import { GripVertical } from "lucide-react"
import UploadResourceDialog from "../uploadresource/UploadResourceDialog"
interface Props {
  task: Task
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({
  id: task.id,
})

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
}

  return (
    <Card  ref={setNodeRef}
  style={style} className="group rounded-2xl border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-50">
      <CardContent className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <button
  {...attributes}
  {...listeners}
  className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700"
>
  <GripVertical className="h-5 w-5" />
</button>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id, !task.completed)}
            className="h-5 w-5 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
          />

          <div>
            <h3
              className={`font-medium transition-colors ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-700"
              }`}
            >
              {task.title}
            </h3>

            <Badge
              className={`mt-1.5 ${
                task.completed
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-100"
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
              ) : (
                <Circle className="mr-1 h-3.5 w-3.5" />
              )}
              {task.completed ? "Completed" : "Pending"}
            </Badge>

          </div>
          <div className="mt-2 flex gap-2">
  {task.category && (
    <Badge variant="outline">
      {task.category.name}
    </Badge>
  )}
</div>
        </div>

        <div className="flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Link to={`/dashboard/tasks/${task.id}`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

          <Link to={`/dashboard/tasks/${task.id}/edit`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-lg text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
            <UploadResourceDialog taskId={task.id} />
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-lg text-slate-500 hover:bg-red-100 hover:text-red-600"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}