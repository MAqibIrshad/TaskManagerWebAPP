import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { CheckSquare, Loader2, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { registerUser } from "@/api/api"

type RegisterForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
const navigate = useNavigate()
  
const mutation = useMutation({
  mutationFn: registerUser,

  onSuccess: () => {
    toast.success("Account created successfully.")

    navigate("/login")
  },

  onError: (error: any) => {
    toast.error(
      error?.response?.data?.detail ??
      "Registration failed."
    )
  },
})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

function onSubmit(data: RegisterForm) {
  mutation.mutate({
    username: data.name,
    email: data.email,
    password: data.password,
  })
}
return (
  <Card className="w-full max-w-md border border-indigo-100 bg-white shadow-xl shadow-indigo-100/30">
    <CardContent className="p-8">
      {/* Logo + Title */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
          <CheckSquare className="h-7 w-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
          <p className="text-slate-500 text-sm">Get started with TaskFlow</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John Doe"
              className={`w-full rounded-xl border bg-white px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:ring-red-400/30"
                  : "border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-xl border bg-white px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-400/30"
                  : "border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
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
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full rounded-xl border bg-white px-4 py-3 pl-10 pr-10 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-400/30"
                  : "border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-xl border bg-white px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-400 focus:ring-red-400/30"
                  : "border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-60"
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          {mutation.isPending ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          Sign in
        </Link>
      </p>
    </CardContent>
  </Card>
);
}