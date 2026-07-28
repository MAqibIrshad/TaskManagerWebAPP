import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { CheckSquare, Loader2, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { loginUser } from "@/api/api"

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token)
      toast.success("Login successful.")
      navigate("/dashboard")
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ?? "Invalid email or password."
      )
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  function onSubmit(data: LoginForm) {
    mutation.mutate({
      email: data.email,
      password: data.password,
    })
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500 ${
      hasError
        ? "border-red-400 focus:ring-red-400/30"
        : "border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-indigo-900/50 dark:hover:border-indigo-700 dark:focus:border-indigo-500"
    }`

  return (
    <div className="rounded-3xl border border-indigo-100 bg-white/90 p-8 shadow-xl shadow-indigo-100/40 backdrop-blur-sm dark:border-indigo-900/40 dark:bg-slate-900/90 dark:shadow-indigo-950/40 sm:p-10">
      {/* Brand + title */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
          <CheckSquare className="h-7 w-7 text-white" />
        </div>
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          Welcome back
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Sign in to TaskFlow
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Pick up where you left off and keep your team moving.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="you@example.com"
              className={fieldClass(!!errors.email)}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`${fieldClass(!!errors.password)} pr-10`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-500"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-6 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 dark:shadow-indigo-900/30"
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          {mutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
