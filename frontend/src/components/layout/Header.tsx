// src/components/layout/Header.tsx
import { ThemeToggle } from "@/components/ThemeToggle"
import QuoteTicker from "@/components/layout/QuoteTicker"
import { ReactNode, useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  categoryId?: number | null | undefined
  onCategoryChange?: (id: number | undefined) => void
  categories?: { id: number; name: string }[]
  children?: ReactNode
  showCategoryFilter?: boolean
}

type StoredUser = {
  id?: number
  name?: string
  username?: string
  email?: string
}

export default function Header({
  categoryId,
  onCategoryChange,
  categories = [],
  children,
  showCategoryFilter = false,
}: HeaderProps) {
  const [user, setUser] = useState<StoredUser | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser || storedUser === "undefined") {
      return
    }

    try {
      setUser(JSON.parse(storedUser))
    } catch (err) {
      console.error("Invalid user in localStorage", err)
      localStorage.removeItem("user")
    }
  }, [])

  const displayName = user?.username ?? user?.name ?? "User"
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-indigo-100/80 bg-white/80 px-4 backdrop-blur-xl dark:border-indigo-900/40 dark:bg-slate-950/80 sm:h-20 sm:px-6">
      {/* Left: category filter */}
      <div className="flex min-w-0 items-center gap-6">
        {showCategoryFilter && onCategoryChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="header-category-filter"
              className="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              Category
            </label>
            <select
              id="header-category-filter"
              className="rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-indigo-900/50 dark:bg-slate-900 dark:text-slate-100"
              value={categoryId ?? "all"}
              onChange={(e) =>
                onCategoryChange(
                  e.target.value === "all" ? undefined : Number(e.target.value)
                )
              }
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Center: quote ticker */}
      <div className="hidden flex-1 justify-center px-4 sm:flex">
        <QuoteTicker />
      </div>

      {/* Right: actions + user + theme */}
      <div className="flex items-center gap-3">
        {children}

        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:ring-2 hover:ring-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
            <Avatar className="h-8 w-8 ring-2 ring-indigo-100 dark:ring-indigo-900/50">
              <AvatarImage src="" alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="w-72 rounded-2xl border border-indigo-100 bg-white p-2 shadow-xl shadow-indigo-100/40 dark:border-indigo-900/40 dark:bg-slate-900 dark:shadow-indigo-950/40"
          >
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-br from-slate-50 via-indigo-50/60 to-white p-3 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {displayName}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user?.email ?? "Signed in"}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-indigo-950/40">
              <User className="mr-3 h-4 w-4 text-indigo-400" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-indigo-950/40">
              <Settings className="mr-3 h-4 w-4 text-indigo-400" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  )
}
