// import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts"

// import {
//   Loader2,
//   Circle,
//   CheckCircle2,
// } from "lucide-react"

// import {
//   getDashboardStats,
//   getWeeklyTasks,
//   getActiveTasks,
//   getCompletedTasks,
// } from "@/api/api"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// type Task = {
//   id: number
//   title: string
//   completed: boolean
// }

// export default function Dashboard() {
//   const LIMIT = 5

//   const [activeSkip, setActiveSkip] = useState(0)
//   const [completedSkip, setCompletedSkip] = useState(0)

//   const statsQuery = useQuery({
//     queryKey: ["dashboard", "stats"],
//     queryFn: getDashboardStats,
//   })

//   const weeklyQuery = useQuery({
//     queryKey: ["dashboard", "weekly"],
//     queryFn: getWeeklyTasks,
//   })

//   const activeQuery = useQuery({
//     queryKey: ["dashboard", "active", activeSkip],
//     queryFn: () => getActiveTasks(activeSkip, LIMIT),
//   })

//   const completedQuery = useQuery({
//     queryKey: ["dashboard", "completed", completedSkip],
//     queryFn: () => getCompletedTasks(completedSkip, LIMIT),
//   })

//   if (
//     statsQuery.isLoading ||
//     weeklyQuery.isLoading ||
//     activeQuery.isLoading ||
//     completedQuery.isLoading
//   ) {
//     return (
//       <div className="flex h-[80vh] flex-col items-center justify-center gap-3">
//         <Loader2 className="h-10 w-10 animate-spin" />
//         <p>Loading Dashboard...</p>
//       </div>
//     )
//   }

//   if (
//     statsQuery.error ||
//     weeklyQuery.error ||
//     activeQuery.error ||
//     completedQuery.error
//   ) {
//     return (
//       <p className="text-center text-red-500">
//         Failed to load dashboard.
//       </p>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white p-8 space-y-8">

//       <div>
//         <h1 className="text-4xl font-bold tracking-tight text-slate-900">
//           Dashboard
//         </h1>

//         <p className="text-muted-foreground">
//           Task overview and weekly progress.
//         </p>
//       </div>

//       {/* Statistics */}

//       <div className="grid gap-6 md:grid-cols-2">

//         <Card className="border-indigo-100 bg-white shadow-lg shadow-indigo-100/40 transition-all hover:-translate-y-1 hover:shadow-xl">
//           <CardHeader>
//             <CardTitle>Total Active Tasks</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <h2 className="text-5xl font-bold">
//               {statsQuery.data.active_tasks}
//             </h2>

//             <p className="mt-2 text-muted-foreground">
//               Pending tasks
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-indigo-100 bg-white shadow-lg shadow-indigo-100/40 transition-all hover:-translate-y-1 hover:shadow-xl">
//           <CardHeader>
//             <CardTitle>Total Completed Tasks</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <h2 className="text-5xl font-bold text-green-600">
//               {statsQuery.data.completed_tasks}
//             </h2>

//             <p className="mt-2 text-muted-foreground">
//               Successfully completed
//             </p>
//           </CardContent>
//         </Card>

//       </div>

//       {/* Weekly Chart */}

//       <Card className="border-indigo-100 bg-white shadow-lg shadow-indigo-100/40 transition-all hover:-translate-y-1 hover:shadow-xl">

//         <CardHeader>
//           <CardTitle>
//             Weekly Completed Tasks
//           </CardTitle>
//         </CardHeader>

//         <CardContent>

//           <ResponsiveContainer
//             width="100%"
//             height={320}
//           >
//             <BarChart data={weeklyQuery.data}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />

//               <Bar
//                 dataKey="completed"
//                 radius={[6, 6, 0, 0]}
//               />

//             </BarChart>

//           </ResponsiveContainer>

//         </CardContent>

//       </Card>

//       {/* Task Lists */}

//       <div className="grid gap-6 lg:grid-cols-2">

//         {/* Active Tasks */}

//         <Card className="border-indigo-100 bg-white shadow-lg shadow-indigo-100/40 transition-all hover:-translate-y-1 hover:shadow-xl">

//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               Active Tasks

//               {activeQuery.isFetching && (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               )}

//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">

//             {activeQuery.data.tasks.map((task: Task) => (

//               <div
//                 key={task.id}
//                 className="flex items-center justify-between rounded-lg border p-3"
//               >

//                 <div className="flex items-center gap-3">
//                   <Circle className="h-4 w-4" />
//                   <span>{task.title}</span>
//                 </div>

//                 <Badge variant="secondary">
//                   Pending
//                 </Badge>

//               </div>

//             ))}

//             <div className="flex justify-between pt-4">

//               <Button
//                 variant="outline"
//                 disabled={activeSkip === 0}
//                 onClick={() =>
//                   setActiveSkip((s) =>
//                     Math.max(0, s - LIMIT)
//                   )
//                 }
//               >
//                 Previous
//               </Button>

//               <Button
//                 variant="outline"
//                 disabled={!activeQuery.data.has_next}
//                 onClick={() =>
//                   setActiveSkip((s) => s + LIMIT)
//                 }
//               >
//                 Next
//               </Button>

//             </div>

//           </CardContent>

//         </Card>

//         {/* Completed Tasks */}

//         <Card className="border-indigo-100 bg-white shadow-lg shadow-indigo-100/40 transition-all hover:-translate-y-1 hover:shadow-xl">

//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               Completed Tasks

//               {completedQuery.isFetching && (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               )}

//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">

//             {completedQuery.data.tasks.map((task: Task) => (

//               <div
//                 key={task.id}
//                 className="flex items-center justify-between rounded-lg border p-3"
//               >

//                 <div className="flex items-center gap-3">

//                   <CheckCircle2 className="h-4 w-4 text-green-600" />

//                   <span className="line-through">
//                     {task.title}
//                   </span>

//                 </div>

//                 <Badge>
//                   Completed
//                 </Badge>

//               </div>

//             ))}

//             <div className="flex justify-between pt-4">

//               <Button
//                 variant="outline"
//                 disabled={completedSkip === 0}
//                 onClick={() =>
//                   setCompletedSkip((s) =>
//                     Math.max(0, s - LIMIT)
//                   )
//                 }
//               >
//                 Previous
//               </Button>

//               <Button
//                 variant="outline"
//                 disabled={!completedQuery.data.has_next}
//                 onClick={() =>
//                   setCompletedSkip((s) => s + LIMIT)
//                 }
//               >
//                 Next
//               </Button>

//             </div>

//           </CardContent>

//         </Card>

//       </div>

//     </div>
//   )
// }

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import {
  Loader2,
  Circle,
  CheckCircle2,
  TrendingUp,
  Activity,
} from "lucide-react"

import {
  getDashboardStats,
  getWeeklyTasks,
  getActiveTasks,
  getCompletedTasks,
} from "@/api/api"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Task = {
  id: number
  title: string
  completed: boolean
}

export default function Dashboard() {
  const LIMIT = 5

  const [activeSkip, setActiveSkip] = useState(0)
  const [completedSkip, setCompletedSkip] = useState(0)

  const statsQuery = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  })

  const weeklyQuery = useQuery({
    queryKey: ["dashboard", "weekly"],
    queryFn: getWeeklyTasks,
  })

  const activeQuery = useQuery({
    queryKey: ["dashboard", "active", activeSkip],
    queryFn: () => getActiveTasks(activeSkip, LIMIT),
  })

  const completedQuery = useQuery({
    queryKey: ["dashboard", "completed", completedSkip],
    queryFn: () => getCompletedTasks(completedSkip, LIMIT),
  })

  if (
    statsQuery.isLoading ||
    weeklyQuery.isLoading ||
    activeQuery.isLoading ||
    completedQuery.isLoading
  ) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-slate-600">Loading Dashboard...</p>
      </div>
    )
  }

  if (
    statsQuery.error ||
    weeklyQuery.error ||
    activeQuery.error ||
    completedQuery.error
  ) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-lg text-red-500">
          Failed to load dashboard.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-none space-y-8 h-full space-y-8 bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Track your productivity and manage tasks efficiently.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2">

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl">

          <CardContent className="flex items-center justify-between p-8">

            <div>

              <p className="text-indigo-100">
                Active Tasks
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                {statsQuery.data.active_tasks}
              </h2>

            </div>

            <div className="rounded-full bg-white/20 p-4">
              <Activity className="h-8 w-8" />
            </div>

          </CardContent>

        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl">

          <CardContent className="flex items-center justify-between p-8">

            <div>

              <p className="text-emerald-100">
                Completed Tasks
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                {statsQuery.data.completed_tasks}
              </h2>

            </div>

            <div className="rounded-full bg-white/20 p-4">
              <TrendingUp className="h-8 w-8" />
            </div>

          </CardContent>

        </Card>

      </div>

      {/* Weekly Chart */}

      <Card className="mt-8 rounded-2xl border-0 shadow-xl">

        <CardHeader>

          <CardTitle className="text-xl">
            Weekly Completed Tasks
          </CardTitle>

        </CardHeader>

        <CardContent>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={weeklyQuery.data}>

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="completed"
                fill="#6366F1"
                radius={[12, 12, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

      {/* Task Lists */}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Active */}

        <Card className="rounded-2xl border-0 shadow-xl">

          <CardHeader className="flex flex-row items-center justify-between">

            <CardTitle className="text-xl">
              Active Tasks
            </CardTitle>

            {activeQuery.isFetching && (
              <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
            )}

          </CardHeader>

          <CardContent className="space-y-4">

            {activeQuery.data.tasks.map((task: Task) => (

              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">

                    <Circle className="h-4 w-4 text-indigo-600" />

                  </div>

                  <span className="font-medium text-slate-700">
                    {task.title}
                  </span>

                </div>

                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Pending
                </Badge>

              </div>

            ))}

            <div className="flex justify-between pt-4">

              <Button
                variant="outline"
                className="rounded-lg"
                disabled={activeSkip === 0}
                onClick={() =>
                  setActiveSkip((s) =>
                    Math.max(0, s - LIMIT)
                  )
                }
              >
                Previous
              </Button>

              <Button
                className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
                disabled={!activeQuery.data.has_next}
                onClick={() =>
                  setActiveSkip((s) => s + LIMIT)
                }
              >
                Next
              </Button>

            </div>

          </CardContent>

        </Card>

        {/* Completed */}

        <Card className="rounded-2xl border-0 shadow-xl">

          <CardHeader className="flex flex-row items-center justify-between">

            <CardTitle className="text-xl">
              Completed Tasks
            </CardTitle>

            {completedQuery.isFetching && (
              <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            )}

          </CardHeader>

          <CardContent className="space-y-4">

            {completedQuery.data.tasks.map((task: Task) => (

              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">

                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                  </div>

                  <span className="font-medium text-slate-500 line-through">
                    {task.title}
                  </span>

                </div>

                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Completed
                </Badge>

              </div>

            ))}

            <div className="flex justify-between pt-4">

              <Button
                variant="outline"
                className="rounded-lg"
                disabled={completedSkip === 0}
                onClick={() =>
                  setCompletedSkip((s) =>
                    Math.max(0, s - LIMIT)
                  )
                }
              >
                Previous
              </Button>

              <Button
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700"
                disabled={!completedQuery.data.has_next}
                onClick={() =>
                  setCompletedSkip((s) => s + LIMIT)
                }
              >
                Next
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}