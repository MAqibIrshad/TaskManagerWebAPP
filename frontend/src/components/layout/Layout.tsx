// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"               // 👈 import

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />

        <main className="flex flex-1 flex-col overflow-hidden">
          <Header showCategoryFilter={false} />

          {/* scrollable content area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-100 via-indigo-50 to-white p-8 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
            <Outlet />
          </div>

          {/* Footer stays at the bottom */}
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  )
}