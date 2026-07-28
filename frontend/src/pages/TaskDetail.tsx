// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import { toast } from "sonner"

// import { deleteTask, getTask } from "@/api/api"
// import queryClient from "@/api/queryClient"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// import {
//   ArrowLeft,
//   Loader2,
//   Search,
//   Trash2,
//   CheckCircle2,
//   Circle,
// } from "lucide-react"

// type SearchForm = {
//   id: number
// }

// export default function TaskDetail() {
//   const [taskId, setTaskId] = useState<number | null>(null)
//   const navigate = useNavigate()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SearchForm>()

//   function onSubmit(data: SearchForm) {
//     setTaskId(Number(data.id))
//   }

//   const {
//     data: task,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["task", taskId],
//     queryFn: () => getTask(taskId!),
//     enabled: taskId !== null,
//     retry: false,
//   })

//   const deleteMutation = useMutation({
//     mutationFn: deleteTask,

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] })
//       toast.success("Task deleted successfully!")
//       setTaskId(null) // clear displayed task
//     },

//     onError: (deleteError) => {
//       if (axios.isAxiosError(deleteError) && deleteError.response?.status === 404) {
//         toast.error("Task not found")
//       } else {
//         toast.error("Failed to delete task.")
//       }
//     },
//   })

//   return (
//     <div className="p-8">
//       {/* Back navigation */}
//       <Button
//         variant="ghost"
//         className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
//         onClick={() => navigate("/tasks")}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Tasks
//       </Button>

//       {/* Search card */}
//       <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl mb-8">
//         <CardHeader>
//           <CardTitle className="text-xl text-slate-900">Find a Task</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
//             <div className="flex-1">
//               <input
//                 type="number"
//                 placeholder="Enter Task ID"
//                 className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
//                 {...register("id", {
//                   required: "Task ID is required",
//                   valueAsNumber: true,
//                   min: {
//                     value: 1,
//                     message: "Task ID must be at least 1",
//                   },
//                 })}
//               />
//               {errors.id && (
//                 <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
//               )}
//             </div>
//             <Button type="submit" className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
//               <Search className="mr-2 h-4 w-4" />
//               Search
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Loading state */}
//       {isLoading && (
//         <div className="flex flex-col items-center justify-center gap-4 py-20">
//           <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//           <p className="text-slate-500">Loading task details...</p>
//         </div>
//       )}

//       {/* Error state */}
//       {error instanceof Error && (
//         <div className="flex justify-center py-10">
//           <p className="text-lg text-red-500">{error.message}</p>
//         </div>
//       )}

//       {/* Task details */}
//       {task && !isLoading && !error && (
//         <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl">
//           <CardHeader className="flex flex-row items-start justify-between">
//             <div className="space-y-1">
//               <CardTitle className="text-2xl font-bold text-slate-900">
//                 {task.title}
//               </CardTitle>
//               <p className="text-sm text-slate-500">Task #{task.id}</p>
//             </div>
//             <Badge
//               className={
//                 task.completed
//                   ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
//                   : "bg-orange-100 text-orange-700 hover:bg-orange-100"
//               }
//             >
//               {task.completed ? (
//                 <CheckCircle2 className="mr-1 h-4 w-4" />
//               ) : (
//                 <Circle className="mr-1 h-4 w-4" />
//               )}
//               {task.completed ? "Completed" : "Pending"}
//             </Badge>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="rounded-xl bg-slate-50 p-6">
//               <div className="grid gap-4">
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm font-medium text-slate-500">Task ID:</span>
//                   <span className="font-medium text-slate-700">{task.id}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm font-medium text-slate-500">Title:</span>
//                   <span className="font-medium text-slate-700">{task.title}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm font-medium text-slate-500">Status:</span>
//                   <span className="font-medium text-slate-700">
//                     {task.completed ? "Completed" : "Pending"}
//                   </span>
//                 </div>
//               </div>
//             </div>
// {task.resource_url && (
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Resource
//               </h3>

//               <img
//                 src={task.resource_url}
//                 alt="Task Resource"
//                 className="w-full rounded-xl border shadow-md object-cover max-h-[500px]"
//               />
//             </div>
//           )}
//             <div className="flex justify-end gap-3">
//               <Button
//                 variant="destructive"
//                 className="rounded-lg"
//                 onClick={() => deleteMutation.mutate(task.id)}
//                 disabled={deleteMutation.isPending}
//               >
//                 {deleteMutation.isPending ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <Trash2 className="mr-2 h-4 w-4" />
//                 )}
//                 Delete Task
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import sanitizeHtml from "sanitize-html"   // <-- new import

import { deleteTask, getTask } from "@/api/api"
import queryClient from "@/api/queryClient"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  ArrowLeft,
  Loader2,
  Search,
  Trash2,
  CheckCircle2,
  Circle,
  XCircle,
  FileText,
  ImageIcon,
} from "lucide-react"

type SearchForm = {
  id: number
}

export default function TaskDetail() {
  const [taskId, setTaskId] = useState<number | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>()

  function onSubmit(data: SearchForm) {
    setTaskId(Number(data.id))
  }

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId!),
    enabled: taskId !== null,
    retry: false,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("Task deleted successfully!")
      navigate("/dashboard/tasks")
    },

    onError: (deleteError) => {
      if (axios.isAxiosError(deleteError) && deleteError.response?.status === 404) {
        toast.error("Task not found")
      } else {
        toast.error("Failed to delete task.")
      }
    },
  })

  // Prepare sanitised description HTML
  const cleanDescription = task?.description
    ? sanitizeHtml(task.description, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          a: ["href", "title"],
          img: ["src", "alt"],
        },
      })
    : ""

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 dark:bg-slate-950">
  {/* Back navigation */}
  <Button
    variant="ghost"
    className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800"
    onClick={() => navigate("/dashboard/tasks")}
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to Tasks
  </Button>

  {/* Search card */}
  <Card className="mx-auto max-w-2xl rounded-2xl border border-border shadow-xl mb-8">
    <CardHeader className="border-b border-border bg-gradient-to-r from-indigo-50 via-indigo-50/30 to-transparent dark:from-indigo-950/40 dark:via-indigo-950/10">
      <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
        <Search className="h-5 w-5 text-indigo-600" />
        Find a Task
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Enter a task ID to look up its details.
      </p>
    </CardHeader>
    <CardContent className="pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <div className="flex-1">
          <input
            type="number"
            placeholder="Enter Task ID"
            className="w-full rounded-xl dark:bg-slate-900 dark:text-white border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            {...register("id", {
              required: "Task ID is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Task ID must be at least 1",
              },
            })}
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>
        <Button type="submit" className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </CardContent>
  </Card>

  {/* Loading state */}
  {isLoading && (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      <p className="text-slate-500">Loading task details...</p>
    </div>
  )}

  {/* Error state */}
  {error instanceof Error && (
    <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-6 py-4 dark:border-red-900 dark:bg-red-950/40">
      <p className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
        <XCircle className="h-4 w-4" />
        {error.message}
      </p>
    </div>
  )}

  {/* Task details */}
  {task && !isLoading && !error && (
    <Card className="mx-auto max-w-3xl rounded-2xl border border-border shadow-xl overflow-hidden">
      {/* Gradient header banner */}
      <div
        className={`px-8 py-7 border-b border-border ${
          task.completed
            ? "bg-gradient-to-r from-emerald-50 via-emerald-50/40 to-transparent dark:from-emerald-950/40 dark:via-emerald-950/10"
            : "bg-gradient-to-r from-orange-50 via-orange-50/40 to-transparent dark:from-orange-950/40 dark:via-orange-950/10"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Task #{task.id}
            </p>
            <CardTitle className="text-2xl font-bold text-foreground leading-tight">
              {task.title}
            </CardTitle>
          </div>
          <Badge
            className={`shrink-0 gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border-0 ${
              task.completed
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300"
            }`}
          >
            {task.completed ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
            {task.completed ? "Completed" : "Pending"}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-8 p-8">
        {/* Meta info row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs font-medium text-muted-foreground/70 mb-1">Task ID</p>
            <p className="text-sm font-semibold text-foreground">#{task.id}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs font-medium text-muted-foreground/70 mb-1">Status</p>
            <p className="text-sm font-semibold text-foreground">
              {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
          {task.category?.name && (
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs font-medium text-muted-foreground/70 mb-1">Category</p>
              <p className="text-sm font-semibold text-foreground">{task.category.name}</p>
            </div>
          )}
        </div>

        {/* Description */}
        {cleanDescription && (
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">
              <FileText className="h-4 w-4" />
              Description
            </h3>
            <div
              className="prose prose-sm max-w-none rounded-xl border border-border bg-slate-50 p-6 text-slate-700 dark:bg-slate-900 dark:text-slate-100"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          </div>
        )}

        {/* Resource image */}
        {task.resource_url && (
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground/70">
              <ImageIcon className="h-4 w-4" />
              Resource
            </h3>
            <img
              src={task.resource_url}
              alt="Task Resource"
              className="w-full rounded-xl border border-border object-cover shadow-md max-h-[500px]"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-border pt-6">
          <Button
            variant="destructive"
            className="rounded-lg"
            onClick={() => deleteMutation.mutate(task.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )}
</div>
  )
}