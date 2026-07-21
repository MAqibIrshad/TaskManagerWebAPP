// src/components/auth/AuthLayout.tsx
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-4">
      <Outlet />
    </div>
  )
}