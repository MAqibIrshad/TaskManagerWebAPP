import { createTask, deleteTask, getCategories, getTasks, reorderTasks, toggleTask, updateTask } from "@/api/api"
import queryClient from "@/api/queryClient"
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog"
import TaskForm from "@/components/tasks/TaskForm"
import TaskList from "@/components/tasks/TaskList"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Tasks() {
  const [categoryId, setCategoryId] =
  useState<number | undefined>()
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
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    })

    toast.success("Tasks reordered.")
  },

  onError: () => {
    toast.error("Failed to reorder tasks.")
  },
})
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      })
      toast.success("Task deleted successfully.")
    },
     onError: () => {
    toast.error("Failed to delete task.")
  },
  })
  

const createMutation = useMutation({
  mutationFn: ({
    title,
    description,
    category_id,
  }: {
    title: string
    description:string
    category_id: number
  }) => createTask(title,description, category_id),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    })

    toast.success("Task created successfully.")
  },
})

//   const updateMutation = useMutation({
//     mutationFn: ({
//       id,
//       title,
//       completed,
//     }: {
//       id: number
//       title: string
//       completed: boolean
//     }) => updateTask(id, title, completed),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["tasks"],
//       })
//     },
//   })

  function handleDeleteTask(id: number) {
    deleteMutation.mutate(id)
  }
  function handleAddTask(
  title: string,
  description:string,
  category_id: number
) {
  createMutation.mutate({
    title,
    description,
    category_id,
  })
}

//   function handleUpdateTask(id:number, title:string, completed:boolean){
//     updateMutation.mutate({
//         id, 
//         title, 
//         completed
//     })
//   }

  const toggleMutation = useMutation({
  mutationFn: ({
    id,
    completed,
  }: {
    id: number
    completed: boolean
  }) => toggleTask(id, completed),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    })
    toast.success("Task status updated.")
  },
   onError: () => {
    toast.error("Failed to update task.")
  },
})

function handleToggleTask(
  id: number,
  completed: boolean
) {
  toggleMutation.mutate({
    id,
    completed,
  })
}
    
 if (isLoading) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm text-muted-foreground">
        Loading task...
      </p>
    </div>
  )
}

  if (error instanceof Error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">

  <label className="font-medium">
    Category
  </label>

  <select
    className="rounded-lg border px-3 py-2"
    value={categoryId ?? ""}
    onChange={(e) =>
      setCategoryId(
        e.target.value === ""
          ? undefined
          : Number(e.target.value)
      )
    }
  >
    <option value="">
      All Categories
    </option>

    {categories.map((category: any) => (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    ))}
  </select>

</div>
      {/* Add Task Form can go here later */}
      {/* <TaskForm addTask={handleAddTask} /> */}
      <CreateTaskDialog addTask={handleAddTask} isPending={createMutation.isPending} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        // onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        onReorder={(taskIds) =>
    reorderMutation.mutate(taskIds)
  }
      />
    </div>
  )
}