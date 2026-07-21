// import { Loader2 } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { useQuery } from "@tanstack/react-query"
// import { getCategories } from "@/api/api"
// type FormData = {
//   title: string
//   category_id: string
// }
// interface TaskFormProps {
//   addTask: (
//     title: string,
//     category_id: number
//   ) => void

//   isSubmitting: boolean
// }

// export default function TaskForm({ addTask, isSubmitting }: TaskFormProps) {
//   const { data: categories = [] } = useQuery({
//   queryKey: ["categories"],
//   queryFn: getCategories,
// })
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>()

//   function onSubmit(data: FormData) {
//     addTask(
//   data.title,
//   Number(data.category_id)
// )
//     reset()
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//       <div>
//         <label
//           htmlFor="title"
//           className="mb-2 block text-sm font-medium text-slate-700"
//         >
//           Task Title
//         </label>

//         <input
//           id="title"
//           type="text"
//           placeholder="e.g. Finish React project"
//           className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
//             errors.title
//               ? "border-red-400 focus:ring-red-200"
//               : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
//           }`}
//           {...register("title", {
//             required: "Task title is required",
//             minLength: {
//               value: 3,
//               message: "Minimum 3 characters",
//             },
//           })}
//         />

//         {errors.title && (
//           <p className="mt-2 text-sm text-red-500">
//             {errors.title.message}
//           </p>
//         )}


//       </div>
//       <div>
//   <label className="mb-2 block text-sm font-medium text-slate-700">
//     Category
//   </label>

//   <select
//     className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
//     {...register("category_id", {
//       required: "Select a category",
//     })}
//   >
//     <option value="">Select Category</option>

//     {categories.map((category: any) => (
//       <option
//         key={category.id}
//         value={category.id}
//       >
//         {category.name}
//       </option>
//     ))}
//   </select>

//   {errors.category_id && (
//     <p className="mt-2 text-sm text-red-500">
//       {errors.category_id.message}
//     </p>
//   )}
// </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
//         {isSubmitting ? "Creating..." : "Create Task"}
//       </button>
//     </form>
//   )
// }
import { Loader2, Bold, Italic, Heading2, Type } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/api/api"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type FormData = {
  title: string
  description: string       // new field
  category_id: string
}

interface TaskFormProps {
  addTask: (
    title: string,
    description: string,     // added parameter
    category_id: number
  ) => void
  isSubmitting: boolean
}

export default function TaskForm({ addTask, isSubmitting }: TaskFormProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const {
    register,
    handleSubmit,
    reset,
    control,                // for TipTap
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: "",      // start empty
    },
  })

  // TipTap editor setup
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[120px] px-4 py-3 focus:outline-none",
      },
    },
  })

  function onSubmit(data: FormData) {
    const descriptionHTML = editor?.getHTML() || ""
    addTask(data.title, descriptionHTML, Number(data.category_id))
    reset()
    editor?.commands.clearContent()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title input (unchanged) */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Finish React project"
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
          }`}
          {...register("title", {
            required: "Task title is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
        />
        {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Rich Text Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>
        <div className="rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200">
          {/* Formatting toolbar */}
          <div className="flex items-center gap-1 border-b border-slate-200 px-2 py-1.5">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`rounded p-1.5 ${
                editor?.isActive("bold") ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`rounded p-1.5 ${
                editor?.isActive("italic") ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"
              }`}
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded p-1.5 ${
                editor?.isActive("heading") ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200"
              }`}
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
            render={({ field }) => (
              <EditorContent editor={editor} />
            )}
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Category dropdown (unchanged) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          {...register("category_id", {
            required: "Select a category",
          })}
        >
          <option value="">Select Category</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="mt-2 text-sm text-red-500">{errors.category_id.message}</p>
        )}
      </div>

      {/* Submit button (unchanged) */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Creating..." : "Create Task"}
      </button>
    </form>
  )
}