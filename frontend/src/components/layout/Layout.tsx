// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function Layout() {
  return (
    <SidebarProvider
      style={{ "--sidebar-width-icon": "4.5rem" } as React.CSSProperties}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
        <AppSidebar />

        {/* Content column: scrolling header+pages, fixed footer */}
        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header scrolls with page content */}
          <main className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-40">
              <Header showCategoryFilter={false} />
            </div>

            <div className="px-4 py-8 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>

          {/* Footer stays pinned — does not scroll */}
          <div className="shrink-0">
            <Footer
              links={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Tasks", href: "/dashboard/tasks" },
                { label: "Reports", href: "/dashboard/tasks/report" },
              ]}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
