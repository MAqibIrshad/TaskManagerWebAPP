// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getTask, updateTask } from "@/api/api";
// import queryClient from "@/api/queryClient";
// import axios from "axios";
// import { toast } from "sonner";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, Save, ArrowLeft, CheckCircle2, Circle } from "lucide-react";

// type EditForm = {
//   title: string;
//   completed: boolean;
// };

// export default function EditTask() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//   } = useForm<EditForm>();

//   const {
//     data: task,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["task", id],
//     queryFn: () => getTask(Number(id)),
//     enabled: !!id,
//     retry: false,
//   });

//   useEffect(() => {
//     if (task) {
//       reset({
//         title: task.title,
//         completed: task.completed,
//       });
//     }
//   }, [task, reset]);

//   const mutation = useMutation({
//     mutationFn: (data: EditForm) =>
//       updateTask(Number(id), data.description, data.title, data.completed),

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//       queryClient.invalidateQueries({ queryKey: ["task", id] });
//       toast.success("Task updated successfully!");
//       navigate("/tasks");
//     },

//     onError: (error) => {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 404) {
//           navigate("/not-found");
//         } else {
//           toast.error("Failed to update task.");
//         }
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     },
//   });
// const onSubmit = (data: EditForm) => {
//   console.log(data);
//   mutation.mutate(data);
// };
//   if (isLoading) {
//     return (
//       <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//         <p className="text-slate-500">Loading task details...</p>
//       </div>
//     );
//   }

//   if (error instanceof Error) {
//     return (
//       <div className="flex h-[80vh] items-center justify-center">
//         <p className="text-lg text-red-500">{error.message}</p>
//       </div>
//     );
//   }

//   if (!task) return null;

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

//       <Card className="mx-auto max-w-2xl rounded-2xl border-0 shadow-xl">
//         <CardHeader className="flex flex-row items-start justify-between">
//           <div className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-slate-900">
//               Edit Task
//             </CardTitle>
//             <p className="text-sm text-slate-500">Task #{task.id}</p>
//           </div>

//           <Badge
//             className={
//               task.completed
//                 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
//                 : "bg-orange-100 text-orange-700 hover:bg-orange-100"
//             }
//           >
//             {task.completed ? (
//               <CheckCircle2 className="mr-1 h-4 w-4" />
//             ) : (
//               <Circle className="mr-1 h-4 w-4" />
//             )}
//             {task.completed ? "Completed" : "Pending"}
//           </Badge>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Title field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-slate-700">
//                 Task Title
//               </label>
//               <input
//                 className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
//                 placeholder="Enter task title"
//                 {...register("title", { required: true })}
//               />
//             </div>

//             {/* Status toggle */}
//             <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
//               <div>
//                 <h4 className="font-medium text-slate-700">Status</h4>
//                 <p className="text-sm text-slate-500">
//                   Mark this task as completed.
//                 </p>
//               </div>
//               {/* <Checkbox
//                 checked={watch("completed")}
//                 onCheckedChange={(checked) => setValue("completed", !!checked)}
//                 className="h-5 w-5 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
//               /> */}
//               <Checkbox
//   checked={watch("completed") ?? false}
//   onCheckedChange={(checked) =>
//     setValue("completed", checked === true)
//   }
// />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="rounded-lg border-slate-200"
//                 onClick={() => navigate("/tasks")}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 disabled={mutation.isPending}
//                 className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
//               >
//                 {mutation.isPending ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-2 h-4 w-4" />
//                     Update Task
//                   </>
//                 )}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // Badge component inline since it's not imported – you can import from "@/components/ui/badge"
// const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
//   <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${className}`}>
//     {children}
//   </span>
// );

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { generateDescription, getTask, updateTask } from "@/api/api";   // updateTask now accepts (id, title, completed, description)
import queryClient from "@/api/queryClient";
import axios from "axios";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";       // proper import
import { Loader2, Save, ArrowLeft, CheckCircle2, Circle, Bold, Italic, Heading2, Type, Sparkles } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type EditForm = {
  title: string;
  description: string;    // new
  completed: boolean;
};

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  });

  // TipTap editor – initialised after task data is available
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",       // will be set when task loads
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[120px] px-4 py-3 focus:outline-none text-slate-600 dark:bg-slate-900 dark:text-white",
      },
    },
  });

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(Number(id)),
    enabled: !!id,
    retry: false,
  });

  // When task data arrives, reset form and set editor content
  useEffect(() => {
    if (task && editor) {
      reset({
        title: task.title,
        description: task.description || "",
        completed: task.completed,
      });
      editor.commands.setContent(task.description || "");
    }
  }, [task, editor, reset]);
const generateMutation = useMutation({
  mutationFn: () =>
    generateDescription(
      watch("title")
    ),

  onSuccess: (data) => {
    editor?.commands.setContent(data.description)
    setValue("description", data.description)
  // Update TipTap editor
    // editor?.commands.setContent(data.description);


    toast.success("Description generated!")
  },

  onError: () => {
    toast.error("Failed to generate description.")
  },
})
  const mutation = useMutation({
    mutationFn: (data: EditForm) =>
      updateTask(Number(id), data.title, data.description, data.completed, "", []),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", id] });
      toast.success("Task updated successfully!");
      navigate("/dashboard/tasks");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          navigate("/not-found");
        } else {
          toast.error("Failed to update task.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = (data: EditForm) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-slate-500">Loading task details...</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-lg text-red-500">{error.message}</p>
      </div>
    );
  }

  if (!task) return null;

  return (
   <div className="min-h-screen bg-slate-50/50 p-8 dark:bg-slate-950">
  <Button
    variant="ghost"
    className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800"
    onClick={() => navigate("/dashboard/tasks")}
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to Tasks
  </Button>

  <Card className="mx-auto max-w-2xl rounded-2xl border border-border shadow-xl overflow-hidden">
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
            Edit Task
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

    <CardContent className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Task Title</label>
          <input
            className="w-full rounded-xl border dark:bg-slate-900 dark:text-white border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter task title"
            {...register("title", { required: true })}
          />
        </div>

        {/* AI Generate button — styled as a subtle inline action */}
        <div className="flex justify-end -mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-900 dark:hover:bg-indigo-950/40"
            onClick={() => generateMutation.mutate()}
            disabled={generateMutation.isPending || !watch("title")}
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Generate Description
              </>
            )}
          </Button>
        </div>

        {/* Rich-text Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description</label>
          <div className="rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-1 border-b border-slate-200 px-2 py-1.5 dark:border-slate-700">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`rounded p-1.5 transition-colors ${
                  editor?.isActive("bold")
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`rounded p-1.5 transition-colors ${
                  editor?.isActive("italic")
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`rounded p-1.5 transition-colors ${
                  editor?.isActive("heading", { level: 2 })
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <Heading2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
                className="rounded p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Type className="h-4 w-4" />
              </button>
            </div>
            <Controller
              name="description"
              control={control}
              render={() => <EditorContent editor={editor} />}
            />
          </div>
        </div>

        {/* Status toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
          <div>
            <h4 className="font-medium text-foreground">Status</h4>
            <p className="text-sm text-muted-foreground">Mark this task as completed.</p>
          </div>
          <Checkbox
            checked={watch("completed") ?? false}
            onCheckedChange={(checked) => setValue("completed", checked === true)}
            className="h-5 w-5 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-border pt-6">
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
            disabled={mutation.isPending}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            {mutation.isPending ? (
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
</div>
  );
}