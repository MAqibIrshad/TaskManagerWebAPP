import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, CheckCircle2, Circle, GripVertical } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import UploadResourceDialog from "../uploadresource/UploadResourceDialog"

type Task = {
  id: number
  title: string
  completed: boolean
  category: {
    id: number
    name: string
  } | null
}

interface Props {
  task: Task
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="group relative flex flex-col rounded-2xl border-0 bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:bg-accent/50 min-h-[180px]"
    >
      <CardContent className="flex flex-col gap-3 p-4 h-full">
        {/* Top row: drag handle + checkbox */}
        <div className="flex items-start justify-between">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
          >
            <GripVertical className="h-5 w-5" />
          </button>
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id, !task.completed)}
            className="h-5 w-5 border-border data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 shrink-0"
          />
        </div>

        {/* Title – line-clamp for consistent height */}
        <h3
          className={`text-sm font-semibold leading-snug line-clamp-2 ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.title}
        </h3>

        {/* Badges – wrapped neatly */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          <Badge
            className={
              task.completed
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400"
                : "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-400"
            }
          >
            {task.completed ? (
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Circle className="mr-1 h-3.5 w-3.5" />
            )}
            {task.completed ? "Completed" : "Pending"}
          </Badge>

          {task.category && (
            <Badge variant="outline" className="text-xs">
              {task.category.name}
            </Badge>
          )}
        </div>

        {/* Action buttons – at the bottom, visible on hover */}
        <div className="flex justify-end gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-1">
          <Link to={`/dashboard/tasks/${task.id}`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/dashboard/tasks/${task.id}/edit`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <UploadResourceDialog taskId={task.id} />
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}