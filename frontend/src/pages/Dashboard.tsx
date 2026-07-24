import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  Pie,
  PieChart,
} from "recharts"
import {
  Loader2,
  Circle,
  CheckCircle2,
  TrendingUp,
  Activity
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
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading Dashboard...</p>
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
        <p className="text-lg text-destructive">
          Failed to load dashboard.
        </p>
      </div>
    )
  }

  const statusData = [
    { name: "Active", value: statsQuery.data.active_tasks },
    { name: "Completed", value: statsQuery.data.completed_tasks },
  ]

  const COLORS = ["#6366F1", "#10B981"]

  return (
    <div className="w-full max-w-none space-y-8 h-full bg-background p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your productivity and manage tasks efficiently.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl">
          <CardContent className="flex items-center justify-between p-8">
            <div>
              <p className="text-indigo-100">Active Tasks</p>
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
              <p className="text-emerald-100">Completed Tasks</p>
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

      {/* Charts */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Weekly Completed Chart */}
        <Card className="rounded-2xl border-0 shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Weekly Completed Tasks
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-4 pt-0">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={weeklyQuery.data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Bar
                  dataKey="completed"
                  fill="#6366F1"
                  radius={[12, 12, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active vs Completed */}
        <Card className="rounded-2xl border-0 shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Active vs Completed
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-4 pt-0">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Task Lists */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Active */}
        <Card className="rounded-2xl border-0 shadow-xl bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-foreground">
              Active Tasks
            </CardTitle>
            {activeQuery.isFetching && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {activeQuery.data.tasks.map((task: Task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4 transition-all hover:border-primary/30 hover:bg-accent hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Circle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">
                    {task.title}
                  </span>
                </div>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-400">
                  Pending
                </Badge>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                className="rounded-lg"
                disabled={activeSkip === 0}
                onClick={() => setActiveSkip((s) => Math.max(0, s - LIMIT))}
              >
                Previous
              </Button>
              <Button
                className="rounded-lg"
                disabled={!activeQuery.data.has_next}
                onClick={() => setActiveSkip((s) => s + LIMIT)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="rounded-2xl border-0 shadow-xl bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-foreground">
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
                className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4 transition-all hover:border-emerald-500/30 hover:bg-accent hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-muted-foreground line-through">
                    {task.title}
                  </span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
                  Completed
                </Badge>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                className="rounded-lg"
                disabled={completedSkip === 0}
                onClick={() => setCompletedSkip((s) => Math.max(0, s - LIMIT))}
              >
                Previous
              </Button>
              <Button
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700"
                disabled={!completedQuery.data.has_next}
                onClick={() => setCompletedSkip((s) => s + LIMIT)}
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