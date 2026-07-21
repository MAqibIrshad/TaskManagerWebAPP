// import { NavLink } from "react-router-dom"
// import {
//   LayoutDashboard,
//   ListTodo,
//   ClipboardList,
//   SquarePen,
//   Settings,
//   CheckSquare,
// } from "lucide-react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Tasks",
//     url: "/tasks",
//     icon: ListTodo,
//   },
//   {
//     title: "Task Detail",
//     url: "/tasks/detail",
//     icon: ClipboardList,
//   },
//   {
//     title: "Edit Task",
//     url: "/tasks/edit",
//     icon: SquarePen,
//   },
// ]

// export function AppSidebar() {
//   return (
//     <Sidebar collapsible="none" className="border-r-0 bg-slate-950 text-slate-100">
//       {/* Header */}
//       <SidebarHeader className="border-b border-slate-800 py-6">
//         <div className="flex items-center gap-3 px-4">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
//             <CheckSquare className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             {/* <h2 className="text-xl font-bold">TaskFlow</h2> */}
//             <h2 className="text-xl font-bold !text-white">TaskFlow</h2>
//             <p className="text-xs text-slate-400">Productivity Manager</p>
//           </div>
//         </div>
//       </SidebarHeader>

//       <SidebarContent className="px-3 py-4">
//         <SidebarGroup>
//           <SidebarGroupLabel className="mb-2 text-xs uppercase tracking-widest text-slate-500">
//             Main Menu
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   {/* No SidebarMenuButton – NavLink styles directly */}
//                   <NavLink
//                     to={item.url}
//                     end={item.url === "/" || item.url === "/tasks"}  
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
//                           : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                       }`
//                     }
//                   >
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.title}</span>
//                   </NavLink>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Footer */}
//       <SidebarFooter className="border-t border-slate-800 p-3">
//         <SidebarMenu className="space-y-1">
//           <SidebarMenuItem>
//             <NavLink
//               to="/settings"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
//                   isActive
//                     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
//                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 }`
//               }
//             >
//               <Settings className="h-5 w-5" />
//               <span>Settings</span>
//             </NavLink>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  ListTodo,
  ClipboardList,
  SquarePen,
  Settings,
  CheckSquare,
  LogOut,
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
} from "@/components/ui/sidebar"

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
]

export function AppSidebar() {
  const navigate = useNavigate()

function handleLogout() {
  // Clear auth token/session here
  localStorage.removeItem("token")  // or your auth logic
  navigate("/login")
}
  return (
    <Sidebar collapsible="none" className="border-r-0 bg-slate-950 text-slate-100">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-800 py-6">
        <div className="flex items-center gap-3 px-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold !text-white">TaskFlow</h2>
            <p className="text-xs text-slate-400">Productivity Manager</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-xs uppercase tracking-widest text-slate-500">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/dashboard" || item.url === "/dashboard/tasks"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-800 p-3">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </SidebarMenuItem>
          {/* Logout */}
    <SidebarMenuItem>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}