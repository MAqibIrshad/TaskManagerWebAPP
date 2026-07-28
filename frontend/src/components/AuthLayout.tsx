// src/layouts/AuthLayout.tsx
import { Link, Outlet } from "react-router-dom"
import { CheckSquare } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white transition-colors dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      {/* Soft atmosphere blobs — same language as landing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/20" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-900/20" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 shadow">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          TaskFlow
        </Link>
        <ThemeToggle />
      </header>

      {/* Centered form */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12 pt-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
