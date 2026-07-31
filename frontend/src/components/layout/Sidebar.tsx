import {
  LayoutDashboard,
  ListTodo,
  ClipboardList,
  SquarePen,
  CheckSquare,
  LogOut,
  Download,
  X,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router-dom"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    title: "Task Detail",
    url: "/dashboard/tasks/detail",
    icon: ClipboardList,
  },
  {
    title: "Edit Task",
    url: "/dashboard/tasks/edit",
    icon: SquarePen,
  },
  {
    title: "Report",
    url: "/dashboard/tasks/report",
    icon: Download,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { isMobile, setOpenMobile } = useSidebar()

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    if (isMobile) setOpenMobile(false)
    navigate("/login")
  }

  function handleNavClick() {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80"
    >
      <SidebarHeader className="py-6">
        <div className="flex flex-col gap-3 px-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
          <div className="flex w-full items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-all duration-300 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:rounded-lg">
                <CheckSquare className="h-6 w-6 text-white transition-all duration-300 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <h2 className="truncate text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  TaskFlow
                </h2>
                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                  Productivity Manager
                </p>
              </div>
            </div>

            {/* Desktop collapse / mobile close */}
            {isMobile ? (
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpenMobile(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <SidebarTrigger className="shrink-0 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 group-data-[collapsible=icon]:hidden" />
            )}
          </div>

          {/* Trigger when desktop icon-collapsed */}
          {!isMobile && (
            <SidebarTrigger className="hidden rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 group-data-[collapsible=icon]:flex" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 group-data-[collapsible=icon]:hidden">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/dashboard" || item.url === "/dashboard/tasks"}
                    title={item.title}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `group/link mx-auto flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:p-0 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover/link:scale-110 ${
                            isActive ? "text-white" : ""
                          }`}
                        />
                        <span className="truncate group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 p-3 dark:border-slate-800/60 group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              title="Logout"
              className="mx-auto flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:p-0"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="truncate group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
