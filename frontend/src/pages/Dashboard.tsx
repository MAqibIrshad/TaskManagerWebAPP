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
  Activity,
  Calendar,
  Clock,
  PieChartIcon,
  BarChart3
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
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Track your productivity and manage tasks efficiently.
      </p>
    </div>
    <div className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
      <Calendar className="h-4 w-4" />
      {new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </div>
  </div>

  {/* Statistics */}
  {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-white/20 p-2.5">
            <Activity className="h-5 w-5" />
          </div>
        </div>
        <h2 className="mt-4 text-4xl font-bold">{statsQuery.data.active_tasks}</h2>
        <p className="mt-1 text-sm text-indigo-100">Active Tasks</p>
      </CardContent>
    </Card>

    <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-white/20 p-2.5">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <h2 className="mt-4 text-4xl font-bold">{statsQuery.data.completed_tasks}</h2>
        <p className="mt-1 text-sm text-emerald-100">Completed Tasks</p>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border border-border bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-orange-100 p-2.5 dark:bg-orange-950/60">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <h2 className="mt-4 text-4xl font-bold text-foreground">
          {statsQuery.data.active_tasks + statsQuery.data.completed_tasks}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Total Tasks</p>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border border-border bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-indigo-100 p-2.5 dark:bg-indigo-950/60">
            <PieChartIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h2 className="mt-4 text-4xl font-bold text-foreground">
          {Math.round(
            (statsQuery.data.completed_tasks /
              (statsQuery.data.active_tasks + statsQuery.data.completed_tasks || 1)) *
              100
          )}
          %
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Completion Rate</p>
      </CardContent>
    </Card>
  </div> */}
{/* Statistics */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  <Card className="cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-white/20 p-2.5">
          <Activity className="h-5 w-5" />
        </div>
      </div>
      <h2 className="mt-4 text-4xl font-bold">{statsQuery.data.active_tasks}</h2>
      <p className="mt-1 text-sm text-indigo-100">Active Tasks</p>
    </CardContent>
  </Card>

  <Card className="cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-white/20 p-2.5">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>
      <h2 className="mt-4 text-4xl font-bold">{statsQuery.data.completed_tasks}</h2>
      <p className="mt-1 text-sm text-emerald-100">Completed Tasks</p>
    </CardContent>
  </Card>

  <Card className="cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-white/20 p-2.5">
          <Clock className="h-5 w-5" />
        </div>
      </div>
      <h2 className="mt-4 text-4xl font-bold">
        {statsQuery.data.active_tasks + statsQuery.data.completed_tasks}
      </h2>
      <p className="mt-1 text-sm text-amber-100">Total Tasks</p>
    </CardContent>
  </Card>

  <Card className="cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-white/20 p-2.5">
          <PieChartIcon className="h-5 w-5" />
        </div>
      </div>
      <h2 className="mt-4 text-4xl font-bold">
        {Math.round(
          (statsQuery.data.completed_tasks /
            (statsQuery.data.active_tasks + statsQuery.data.completed_tasks || 1)) *
            100
        )}
        %
      </h2>
      <p className="mt-1 text-sm text-sky-100">Completion Rate</p>
    </CardContent>
  </Card>
</div>
  {/* Charts */}
  <div className="grid gap-8 lg:grid-cols-2">
    <Card className="rounded-2xl border border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-foreground">Weekly Completed Tasks</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Tasks finished per day this week</p>
        </div>
        <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-950/60">
          <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
      </CardHeader>

      <CardContent className="pb-4 pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={weeklyQuery.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Bar dataKey="completed" fill="#6366F1" radius={[12, 12, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="rounded-2xl border border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-foreground">Active vs Completed</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Overall task distribution</p>
        </div>
        <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950/60">
          <PieChartIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      </CardHeader>

      <CardContent className="pb-4 pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
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
  <div className="grid gap-8 lg:grid-cols-2">
    {/* Active */}
    <Card className="rounded-2xl shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-orange-100 p-1.5 dark:bg-orange-950/60">
            <Circle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-lg text-foreground">Active Tasks</CardTitle>
        </div>
        {activeQuery.isFetching && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {activeQuery.data.tasks.map((task: Task) => (
          <div
            key={task.id}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-orange-500/30 hover:bg-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Circle className="h-4 w-4 text-primary" />
              </div>
              <span className="truncate font-medium text-foreground">{task.title}</span>
            </div>
            <Badge className="shrink-0 border-0 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-950 dark:text-orange-400">
              Pending
            </Badge>
          </div>
        ))}

        <div className="flex justify-between pt-2">
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
    <Card className="rounded-2xl shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-100 p-1.5 dark:bg-emerald-950/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-lg text-foreground">Completed Tasks</CardTitle>
        </div>
        {completedQuery.isFetching && (
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {completedQuery.data.tasks.map((task: Task) => (
          <div
            key={task.id}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-emerald-500/30 hover:bg-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="truncate font-medium text-muted-foreground line-through">
                {task.title}
              </span>
            </div>
            <Badge className="shrink-0 border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
              Completed
            </Badge>
          </div>
        ))}

        <div className="flex justify-between pt-2">
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