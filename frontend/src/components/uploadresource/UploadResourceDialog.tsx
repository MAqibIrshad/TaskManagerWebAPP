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

      {/* <DialogTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-lg text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
        >
          <ImagePlus className="h-4 w-4" />
        </Button>
      </DialogTrigger> */}
      {/* <DialogTrigger
  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
>
  <ImagePlus className="h-4 w-4" />
</DialogTrigger> */}
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

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="file"
            accept="image/*"
            {...register("file", {
              required: true,
            })}
          />

          <Button
          type="submit"
            className="w-full"
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

      </DialogContent>

    </Dialog>
  )
}