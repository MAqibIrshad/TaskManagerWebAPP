import { Link } from "react-router-dom"
import { TriangleAlert, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        <TriangleAlert className="mx-auto h-20 w-20 text-red-500" />

        <h1 className="mt-6 text-5xl font-bold">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <Button className="mt-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>

      </div>
    </div>
  )
}