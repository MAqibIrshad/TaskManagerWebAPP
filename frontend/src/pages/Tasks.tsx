import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2, PlusCircle, ClipboardList } from "lucide-react"
import { toast } from "sonner"

import {
  createTask,
  deleteTask,
  getCategories,
  getTasks,
  reorderTasks,
  toggleTask,
} from "@/api/api"
import queryClient from "@/api/queryClient"

import CreateTaskDialog from "@/components/tasks/CreateTaskDialog"
import TaskList from "@/components/tasks/TaskList"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function Tasks() {
  const [categoryId, setCategoryId] = useState<number | undefined>()

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", categoryId],
    queryFn: () => getTasks(categoryId),
    retry: false,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const reorderMutation = useMutation({
    mutationFn: reorderTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Tasks reordered.")
    },
    onError: () => toast.error("Failed to reorder tasks."),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Task deleted.")
    },
    onError: () => toast.error("Failed to delete task."),
  })

  const createMutation = useMutation({
    mutationFn: ({
      title,
      description,
      category_id,
      milestone,
      tags
    }: {
      title: string
      description: string
      category_id: number
      milestone?:string
      tags?:string[]
    }) => createTask(title, description, category_id, milestone, tags),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Task created.")
    },
    onError: () => toast.error("Failed to create task."),
  })

  const toggleMutation = useMutation({
    mutationFn: ({
      id,
      completed,
    }: {
      id: number
      completed: boolean
    }) => toggleTask(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Task updated.")
    },
    onError: () => toast.error("Failed to update task."),
  })

  // Loading skeleton
 if (isLoading) {
  return (
    <div className="space-y-3">
  {Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className="rounded-2xl bg-background p-5 shadow-md"
    >
      <Skeleton className="mb-3 h-5 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-1/2 rounded-md" />
    </div>
  ))}
</div>
  )
}

  // Error state
  if (error instanceof Error) {
    return (
      <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
        <CardContent className="p-6">
          <p className="font-medium text-destructive">
            {error.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-1">
  <div className="flex items-center gap-3">
    <label
      htmlFor="category-filter"
      className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap"
    >
      Category
    </label>
    <select
      id="category-filter"
      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      value={categoryId ?? "all"}
      onChange={(e) =>
        setCategoryId(
          e.target.value === "all" ? undefined : Number(e.target.value)
        )
      }
    >
      <option value="all">All Categories</option>
      {categories.map((cat: any) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>

  <CreateTaskDialog
    addTask={handleAddTask}
    isPending={createMutation.isPending}
  />
</div>

      {/* Task list or empty state */}
      {tasks.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="mb-3 h-10 w-10 text-muted-foreground/60" />
            <p className="text-lg font-medium text-muted-foreground">
              No tasks found
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              {categoryId
                ? "Try selecting a different category or create a new task."
                : "Get started by creating your first task."}
            </p>
            <CreateTaskDialog
              addTask={handleAddTask}
              isPending={createMutation.isPending}
              trigger={
                <Button className="mt-4" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onReorder={(taskIds) => reorderMutation.mutate(taskIds)}
        />
      )}
    </div>
  )

  function handleAddTask(
    title: string,
    description: string,
    category_id: number
  ) {
    createMutation.mutate({ title, description, category_id })
  }

  function handleToggleTask(id: number, completed: boolean) {
    toggleMutation.mutate({ id, completed })
  }

  function handleDeleteTask(id: number) {
    deleteMutation.mutate(id)
  }
}