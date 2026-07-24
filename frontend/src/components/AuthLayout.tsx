// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import Footer from "@/components/layout/Footer"

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 transition-colors">
      {/* Main area – takes remaining space and centers the form */}
      <main className="relative flex flex-1 items-center justify-center p-4">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/20" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-900/20" />
        </div>

        {/* Theme toggle in top right */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Form container */}
        <div className="relative z-10 w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer pinned to bottom */}
      <Footer />
    </div>
  )
}