// import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { useQuery, useMutation } from "@tanstack/react-query"
// import {
//   Search,
//   Save,
//   Loader2,
//   ArrowLeft,
//   CheckCircle2,
//   Circle,
// } from "lucide-react"
// import { toast } from "sonner"
// import axios from "axios"
// import { useNavigate, useParams } from "react-router-dom"

// import { getTask, updateTask } from "@/api/api"
// import queryClient from "@/api/queryClient"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"

// type SearchForm = {
//   id: number
// }

// type EditForm = {
//   title: string
//   completed: boolean
// }

// export default function TaskEdit() {
//   const { task_id } = useParams()
//   const navigate = useNavigate()
//   const [taskId, setTaskId] = useState<number | null>(
//     task_id ? Number(task_id) : null
//   )

//   // Search form
//   const searchForm = useForm<SearchForm>({
//     defaultValues: { id: taskId ?? undefined },
//   })

//   // Edit form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//   } = useForm<EditForm>()

//   function handleSearch(data: SearchForm) {
//     setTaskId(data.id)
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

//   // Sync fetched task to edit form
//   useEffect(() => {
//     if (task) {
//       reset({
//         title: task.title,
//         completed: task.completed,
//       })
//     }
//   }, [task, reset])

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
//       queryClient.invalidateQueries({ queryKey: ["tasks"] })
//       queryClient.invalidateQueries({ queryKey: ["task", taskId] })
//       toast.success("Task updated successfully.")
//     },

//     onError: (error) => {
//       if (axios.isAxiosError(error) && error.response?.status === 404) {
//         navigate("/not-found")
//       } else {
//         toast.error("Failed to update task.")
//       }
//     },
//   })

//   function onSubmit(data: EditForm) {
//     if (!taskId) return
//     updateMutation.mutate({
//       id: taskId,
//       title: data.title,
//       completed: data.completed,
//     })
//     console.log(data)
//   }

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
//       <Card className="mx-auto max-w-2xl rounded-2xl border-0 shadow-xl mb-8">
//         <CardHeader>
//           <CardTitle className="text-xl text-slate-900">
//             Find Task to Edit
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form
//             onSubmit={searchForm.handleSubmit(handleSearch)}
//             className="flex gap-3"
//           >
//             <input
//               type="number"
//               placeholder="Enter Task ID"
//               className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
//               {...searchForm.register("id", {
//                 required: true,
//                 valueAsNumber: true,
//               })}
//             />
//             <Button
//               type="submit"
//               className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
//             >
//               <Search className="mr-2 h-4 w-4" />
//               Load
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

//       {/* Edit form */}
//       {task && !isLoading && !error && (
//         <Card className="mx-auto max-w-2xl rounded-2xl border-0 shadow-xl">
//           <CardHeader className="flex flex-row items-start justify-between">
//             <div className="space-y-1">
//               <CardTitle className="text-2xl font-bold text-slate-900">
//                 Edit Task
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

//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//               {/* Title field */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-slate-700">
//                   Task Title
//                 </label>
//                 <input
//                   className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
//                   placeholder="Enter task title"
//                   {...register("title", { required: true })}
//                 />
//               </div>

//               {/* Status toggle */}
//               <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
//                 <div>
//                   <h4 className="font-medium text-slate-700">Status</h4>
//                   <p className="text-sm text-slate-500">
//                     Mark this task as completed.
//                   </p>
//                 </div>
//                <Checkbox
//   checked={watch("completed")}
//   onCheckedChange={(checked) =>
//     setValue("completed", checked === true)
//   }
//   className="h-5 w-5 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
// />
//               </div>

//               {/* Update button */}
//               <div className="flex justify-end gap-3 pt-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="rounded-lg border-slate-200"
//                   onClick={() => navigate("/tasks")}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={updateMutation.isPending}
//                   className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   {updateMutation.isPending ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" />
//                       Update Task
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"   // added Controller
import { useQuery, useMutation } from "@tanstack/react-query"
import {
  Search,
  Save,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Bold,
  Italic,
  Heading2,
  Type,
} from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { getTask, updateTask } from "@/api/api"
import queryClient from "@/api/queryClient"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// TipTap imports
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type SearchForm = {
  id: number
}

type EditForm = {
  title: string
  description: string   // new field
  completed: boolean
}

export default function TaskEdit() {
  const { task_id } = useParams()
  const navigate = useNavigate()
  const [taskId, setTaskId] = useState<number | null>(
    task_id ? Number(task_id) : null
  )

  // Search form
  const searchForm = useForm<SearchForm>({
    defaultValues: { id: taskId ?? undefined },
  })

  // Edit form – added defaultValues for description
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,            // for TipTap
  } = useForm<EditForm>({
    defaultValues: {
      description: "",
    },
  })

  // TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",         // will be set when task loads
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[120px] px-4 py-3 focus:outline-none",
      },
    },
  })

  function handleSearch(data: SearchForm) {
    setTaskId(data.id)
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

  // Sync fetched task to edit form AND editor
  useEffect(() => {
    if (task && editor) {
      reset({
        title: task.title,
        description: task.description || "",
        completed: task.completed,
      })
      editor.commands.setContent(task.description || "")
    }
  }, [task, editor, reset])

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      title,
      completed,
      description,
    }: {
      id: number
      title: string
      completed: boolean
      description?: string     // optional
    }) => updateTask(id, title, description || "", completed),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["task", taskId] })
      toast.success("Task updated successfully.")
    },

    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/not-found")
      } else {
        toast.error("Failed to update task.")
      }
    },
  })

  function onSubmit(data: EditForm) {
    if (!taskId) return
    updateMutation.mutate({
      id: taskId,
      title: data.title,
      completed: data.completed,
      description: editor?.getHTML() || "",
    })
  }

  return (
    <div className="p-8">
      {/* Back navigation */}
      <Button
        variant="ghost"
        className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
        onClick={() => navigate("/dashboard/tasks")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>

      {/* Search card */}
      <Card className="mx-auto max-w-2xl rounded-2xl border-0 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Find Task to Edit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={searchForm.handleSubmit(handleSearch)}
            className="flex gap-3"
          >
            <input
              type="number"
              placeholder="Enter Task ID"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
              {...searchForm.register("id", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Button
              type="submit"
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            >
              <Search className="mr-2 h-4 w-4" />
              Load
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

      {/* Edit form */}
      {task && !isLoading && !error && (
        <Card className="mx-auto max-w-2xl rounded-2xl border-0 shadow-xl">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Edit Task
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

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Task Title
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter task title"
                  {...register("title", { required: true })}
                />
              </div>

              {/* Rich‑text description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 border-b border-slate-200 px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`rounded p-1.5 ${editor?.isActive("bold") ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"}`}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`rounded p-1.5 ${editor?.isActive("italic") ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"}`}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`rounded p-1.5 ${editor?.isActive("heading", { level: 2 }) ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"}`}
                    >
                      <Heading2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
                      className="rounded p-1.5 text-slate-500 hover:bg-slate-200"
                    >
                      <Type className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Editor content */}
                  <Controller
                    name="description"
                    control={control}
                    render={() => <EditorContent editor={editor} />}
                  />
                </div>
              </div>

              {/* Status toggle */}
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <h4 className="font-medium text-slate-700">Status</h4>
                  <p className="text-sm text-slate-500">
                    Mark this task as completed.
                  </p>
                </div>
                <Checkbox
                  checked={watch("completed")}
                  onCheckedChange={(checked) =>
                    setValue("completed", checked === true)
                  }
                  className="h-5 w-5 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg border-slate-200"
                  onClick={() => navigate("/tasks")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Task
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}