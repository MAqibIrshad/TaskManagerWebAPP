import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-100 via-indigo-50 to-white">
          <div className="w-full p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}