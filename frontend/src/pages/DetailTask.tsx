// // import { useNavigate, useParams } from "react-router-dom";
// // import { useMutation, useQuery } from "@tanstack/react-query";
// // import axios from "axios";
// // import { toast } from "sonner";

// // import { getTask, deleteTask } from "@/api/api";
// // import queryClient from "@/api/queryClient";

// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";

// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";

// // import {
// //   Loader2,
// //   Trash2,
// //   ArrowLeft,
// //   CheckCircle2,
// //   Circle,
// // } from "lucide-react";

// // export default function DetailTask() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const {
// //     data: task,
// //     isLoading,
// //     error,
// //   } = useQuery({
// //     queryKey: ["task", id],
// //     queryFn: () => getTask(Number(id)),
// //     enabled: !!id,
// //     retry: false,
// //   });

// //   const deleteMutation = useMutation({
// //     mutationFn: deleteTask,

// //     onSuccess: () => {
// //       queryClient.invalidateQueries({
// //         queryKey: ["tasks"],
// //       });

// //       toast.success("Task deleted successfully.");
// //       navigate("/tasks");
// //     },

// //     onError: (error) => {
// //       if (axios.isAxiosError(error) && error.response?.status === 404) {
// //         navigate("/not-found");
// //       } else {
// //         toast.error("Failed to delete task.");
// //       }
// //     },
// //   });

// //   if (isLoading) {
// //     return (
// //       <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
// //         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
// //         <p className="text-slate-500">Loading task details...</p>
// //       </div>
// //     );
// //   }

// //   if (error instanceof Error) {
// //     return (
// //       <div className="flex h-[80vh] items-center justify-center">
// //         <p className="text-lg text-red-500">
// //           {error.message}
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (!task) return null;

// //   return (
// //     <div className="p-8">
// //       {/* Back navigation */}
// //       <Button
// //         variant="ghost"
// //         className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
// //         onClick={() => navigate("/tasks")}
// //       >
// //         <ArrowLeft className="mr-2 h-4 w-4" />
// //         Back to Tasks
// //       </Button>

// //       <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl">
// //         <CardHeader className="flex flex-row items-start justify-between">
// //           <div className="space-y-1">
// //             <CardTitle className="text-2xl font-bold text-slate-900">
// //               {task.title}
// //             </CardTitle>
// //             <p className="text-sm text-slate-500">
// //               Task #{task.id}
// //             </p>
// //           </div>
// //           <Badge
// //             className={
// //               task.completed
// //                 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
// //                 : "bg-orange-100 text-orange-700 hover:bg-orange-100"
// //             }
// //           >
// //             {task.completed ? (
// //               <CheckCircle2 className="mr-1 h-4 w-4" />
// //             ) : (
// //               <Circle className="mr-1 h-4 w-4" />
// //             )}
// //             {task.completed ? "Completed" : "Pending"}
// //           </Badge>
// //         </CardHeader>

// //         <CardContent className="space-y-8">
// //           <div className="rounded-xl bg-slate-50 p-6">
// //             <div className="grid gap-4">
// //               <div className="flex items-center gap-3">
// //                 <span className="text-sm font-medium text-slate-500">Title:</span>
// //                 <span className="font-medium text-slate-700">{task.title}</span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <span className="text-sm font-medium text-slate-500">Status:</span>
// //                 <span className="font-medium text-slate-700">
// //                   {task.completed ? "Completed" : "Pending"}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-3">
// //             <Button
// //               variant="destructive"
// //               className="rounded-lg"
// //               onClick={() => deleteMutation.mutate(task.id)}
// //               disabled={deleteMutation.isPending}
// //             >
// //               {deleteMutation.isPending ? (
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               ) : (
// //                 <Trash2 className="mr-2 h-4 w-4" />
// //               )}
// //               Delete Task
// //             </Button>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// import { useNavigate, useParams } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "sonner";

// import { getTask, deleteTask } from "@/api/api";
// import queryClient from "@/api/queryClient";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// import {
//   Loader2,
//   Trash2,
//   ArrowLeft,
//   CheckCircle2,
//   Circle,
// } from "lucide-react";

// export default function DetailTask() {
//   const { id } = useParams();
//   const navigate = useNavigate();

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

//   const deleteMutation = useMutation({
//     mutationFn: deleteTask,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["tasks"],
//       });

//       toast.success("Task deleted successfully.");
//       navigate("/tasks");
//     },

//     onError: (error) => {
//       if (axios.isAxiosError(error) && error.response?.status === 404) {
//         navigate("/not-found");
//       } else {
//         toast.error("Failed to delete task.");
//       }
//     },
//   });

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
//       <Button
//         variant="ghost"
//         className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
//         onClick={() => navigate("/tasks")}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Tasks
//       </Button>

//       <Card className="mx-auto max-w-3xl rounded-2xl border-0 shadow-xl">
//         <CardHeader className="flex flex-row items-start justify-between">
//           <div className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-slate-900">
//               {task.title}
//             </CardTitle>

//             <p className="text-sm text-slate-500">
//               Task #{task.id}
//             </p>
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

//         <CardContent className="space-y-8">
//           <div className="rounded-xl bg-slate-50 p-6">
//             <div className="grid gap-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-medium text-slate-500">
//                   Title:
//                 </span>

//                 <span className="font-medium text-slate-700">
//                   {task.title}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-medium text-slate-500">
//                   Status:
//                 </span>

//                 <span className="font-medium text-slate-700">
//                   {task.completed ? "Completed" : "Pending"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {task.resource_url && (
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

//           <div className="flex justify-end gap-3">
//             <Button
//               variant="destructive"
//               className="rounded-lg"
//               onClick={() => deleteMutation.mutate(task.id)}
//               disabled={deleteMutation.isPending}
//             >
//               {deleteMutation.isPending ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Delete Task
//                 </>
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import sanitizeHtml from "sanitize-html";  // client-side sanitizer

import { getTask, deleteTask } from "@/api/api";
import queryClient from "@/api/queryClient";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Circle,
  ImageIcon,
  FileText,
} from "lucide-react";

export default function DetailTask() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully.");
      navigate("/dashboard/tasks");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/not-found");
      } else {
        toast.error("Failed to delete task.");
      }
    },
  });

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

  // Sanitise the description before rendering (optional extra safety)
  const cleanDescription = task.description
    ? sanitizeHtml(task.description, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          a: ["href", "title"],
          img: ["src", "alt"],
        },
      })
    : "";

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
        {task.created_at && (
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs font-medium text-muted-foreground/70 mb-1">Created</p>
            <p className="text-sm font-semibold text-foreground">
              {new Date(task.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
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
</div>
  );
}