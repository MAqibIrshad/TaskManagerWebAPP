// src/components/Header.tsx
import { ThemeToggle } from "@/components/ThemeToggle"
import QuoteTicker from "@/components/layout/QuoteTicker"   // 👈 new import
import { ReactNode } from "react"

interface HeaderProps {
  categoryId?: number | null | undefined
  onCategoryChange?: (id: number | undefined) => void
  categories?: { id: number; name: string }[]
  children?: ReactNode
  showCategoryFilter?: boolean
}

export default function Header({
  categoryId,
  onCategoryChange,
  categories = [],
  children,
  showCategoryFilter = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      {/* Left section: category filter */}
      <div className="flex items-center gap-6">
        {showCategoryFilter && onCategoryChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="header-category-filter"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap"
            >
              Category
            </label>
            <select
              id="header-category-filter"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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

      {/* Center: moving quotation */}
      <div className="hidden sm:flex flex-1 justify-center px-4">
        <QuoteTicker />
      </div>

      {/* Right section: actions + theme toggle */}
      <div className="flex items-center gap-4">
        {children}
        <ThemeToggle />
      </div>
    </header>
  )
}