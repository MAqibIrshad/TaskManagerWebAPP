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
      setTaskId(null)
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
    <div className="p-8">
      {/* Back navigation */}
      <Button
        variant="ghost"
        className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
        onClick={() => navigate("/tasks")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      {/* Search card */}
      <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">Find a Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Enter Task ID"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
        <div className="flex justify-center py-10">
          <p className="text-lg text-red-500">{error.message}</p>
        </div>
      )}

      {/* Task details */}
      {task && !isLoading && !error && (
        <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900">
                {task.title}
              </CardTitle>
              <p className="text-sm text-slate-500">Task #{task.id}</p>
            </div>
            <Badge
              className={
                task.completed
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-100"
              }
            >
              {task.completed ? (
                <CheckCircle2 className="mr-1 h-4 w-4" />
              ) : (
                <Circle className="mr-1 h-4 w-4" />
              )}
              {task.completed ? "Completed" : "Pending"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Title, Status */}
            <div className="rounded-xl bg-slate-50 p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">Task ID:</span>
                  <span className="font-medium text-slate-700">{task.id}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">Title:</span>
                  <span className="font-medium text-slate-700">{task.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">Status:</span>
                  <span className="font-medium text-slate-700">
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description – rendered as safe HTML */}
            {cleanDescription && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Description</h3>
                <div
                  className="prose prose-sm max-w-none rounded-xl bg-slate-50 p-6 text-slate-700"
                  dangerouslySetInnerHTML={{ __html: cleanDescription }}
                />
              </div>
            )}

            {/* Resource image */}
            {task.resource_url && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Resource</h3>
                <img
                  src={task.resource_url}
                  alt="Task Resource"
                  className="w-full rounded-xl border shadow-md object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="destructive"
                className="rounded-lg"
                onClick={() => deleteMutation.mutate(task.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete Task
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}