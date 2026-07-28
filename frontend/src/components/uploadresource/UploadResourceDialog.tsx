import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ImagePlus, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { uploadTaskResource } from "@/api/api"
import queryClient from "@/api/queryClient"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

type FormData = {
  file: FileList
}

interface Props {
  taskId: number
}

export default function UploadResourceDialog({
  taskId,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<FormData>()

  const mutation = useMutation({
    mutationFn: (file: File) =>
      uploadTaskResource(taskId, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      })

      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      })

      toast.success("Image uploaded successfully.")

      reset()
    },

    onError: () => {
      toast.error("Failed to upload image.")
    },
  })

  function onSubmit(data: FormData) {
    mutation.mutate(data.file[0])
  }

  return (
    <Dialog>
  <DialogTrigger
    render={
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 rounded-lg text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
      />
    }
  >
    <ImagePlus className="h-4 w-4" />
  </DialogTrigger>

  <DialogContent
    className="max-w-md rounded-2xl border border-border bg-white dark:bg-gray-900
               shadow-2xl shadow-black/10 p-0 overflow-hidden"
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-indigo-50 via-indigo-50/60 to-indigo-50
                     dark:from-gray-800 dark:via-gray-800 dark:to-gray-800
                     px-6 py-5 border-b border-border">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-indigo-600" />
          Upload Resource
        </DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Attach an image to this task.
        </p>
      </DialogHeader>
    </div>

    {/* Form body */}
    <div className="px-6 py-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Styled file input */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
                     border-slate-200 bg-slate-50 px-4 py-8 text-center cursor-pointer
                     transition-colors hover:border-indigo-300 hover:bg-indigo-50/50
                     dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-indigo-500"
        >
          <ImagePlus className="h-6 w-6 text-slate-400" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Click to select an image
          </span>
          <span className="text-xs text-slate-400">PNG, JPG up to 10MB</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("file", { required: true })}
          />
        </label>
        {errors.file && (
          <p className="text-sm text-red-500">Please select a file</p>
        )}

        <Button
          type="submit"
          className="w-full rounded-lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Image"
          )}
        </Button>
      </form>
    </div>
  </DialogContent>
</Dialog>
  )
}