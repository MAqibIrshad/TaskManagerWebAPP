import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, CheckCircle2, Circle, GripVertical, Folder, MoreVertical, Calendar } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import UploadResourceDialog from "../uploadresource/UploadResourceDialog"
import { stripHtml, truncateText } from "@/lib/utils"

type Task = {
  id: number
  title: string
  completed: boolean
  description?:string
  created_at:Date
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
  className={`group relative flex flex-col rounded-2xl ring-0
              bg-white dark:bg-gray-900
              shadow-sm hover:shadow-md
              transition-all duration-300 ease-out
              min-h-[160px] overflow-hidden pl-1`}
>
  {/* Left colored accent bar */}
  <div
    className={`absolute top-0 left-0 bottom-0 w-1 ${
      task.completed ? "bg-emerald-500" : "bg-orange-400"
    }`}
  />

  <CardContent className="relative flex flex-col gap-2 p-4 pl-5 h-full">
    {/* Top row */}
    <div className="flex items-start justify-between">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground/70 transition-colors shrink-0"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-1">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id, !task.completed)}
          className="h-4 w-4 rounded-md border-2 border-muted-foreground/30
                     data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500
                     transition-colors"
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

    {/* Title */}
    <h3
      className={`text-sm font-semibold leading-snug ${
        task.completed
          ? "text-muted-foreground/60 line-through decoration-muted-foreground/40"
          : "text-foreground"
      }`}
    >
      {task.title}
    </h3>

    {/* Description */}
    {task.description && (
      <p className="text-xs text-muted-foreground/80 leading-snug line-clamp-2">
        {truncateText(stripHtml(task.description), 80)}
      </p>
    )}

    {/* Badges */}
    <div className="flex flex-wrap items-center gap-1.5 mt-auto">
      <Badge
        className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border-0 ${
          task.completed
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
            : "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </Badge>
      {task.category && (
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 rounded-full text-[10px] font-normal text-muted-foreground/80
                     border-muted-foreground/20 bg-transparent"
        >
          <Folder className="mr-1 h-3 w-3" />
          {task.category.name}
        </Badge>
      )}
    </div>

    {/* Date row */}
    {task.created_at && (
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
        <Calendar className="h-3 w-3" />
        <span>
          {new Date(task.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    )}

    {/* Action buttons */}
    <div className="flex justify-end gap-1 pt-0.5">
      <Link to={`/dashboard/tasks/${task.id}`}>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 rounded-lg border-muted-foreground/15 text-muted-foreground/80
                     hover:bg-muted hover:text-foreground"
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </Link>
      <Link to={`/dashboard/tasks/${task.id}/edit`}>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 rounded-lg border-muted-foreground/15 text-muted-foreground/80
                     hover:bg-muted hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </Link>
      <UploadResourceDialog taskId={task.id} />
      <Button
        size="icon"
        variant="outline"
        className="h-7 w-7 rounded-lg border-muted-foreground/15 text-muted-foreground/80
                   hover:bg-red-50 hover:text-red-500 hover:border-red-200
                   dark:hover:bg-red-950/40 dark:hover:text-red-400"
        onClick={() => onDelete(task.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  </CardContent>
</Card>
  )
}