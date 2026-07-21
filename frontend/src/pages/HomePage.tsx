// src/pages/HomePage.tsx
import { Link } from "react-router-dom"
import { CheckSquare, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-4">
      <Card className="w-full max-w-lg rounded-2xl border-0 bg-white shadow-xl">
        <CardContent className="flex flex-col items-center p-8 text-center">
          {/* Logo */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg mb-6">
            <CheckSquare className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to TaskFlow</h1>
          <p className="text-slate-500 max-w-sm mb-8">
            Streamline your workflow, track tasks, and boost productivity – all in one place.
          </p>

          {/* Action buttons */}
          <div className="flex w-full gap-4">
            <Link to="/login" className="flex-1">
              <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-200 transition-all">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>

            <Link to="/register" className="flex-1">
              <Button
                variant="outline"
                className="w-full rounded-xl border-2 border-indigo-200 py-3 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}