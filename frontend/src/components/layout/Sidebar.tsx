// // import { NavLink } from "react-router-dom"
// // import {
// //   LayoutDashboard,
// //   ListTodo,
// //   ClipboardList,
// //   SquarePen,
// //   Settings,
// //   CheckSquare,
// // } from "lucide-react"

// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarGroup,
// //   SidebarGroupContent,
// //   SidebarGroupLabel,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuItem,
// // } from "@/components/ui/sidebar"

// // const items = [
// //   {
// //     title: "Dashboard",
// //     url: "/dashboard",
// //     icon: LayoutDashboard,
// //   },
// //   {
// //     title: "Tasks",
// //     url: "/tasks",
// //     icon: ListTodo,
// //   },
// //   {
// //     title: "Task Detail",
// //     url: "/tasks/detail",
// //     icon: ClipboardList,
// //   },
// //   {
// //     title: "Edit Task",
// //     url: "/tasks/edit",
// //     icon: SquarePen,
// //   },
// // ]

// // export function AppSidebar() {
// //   return (
// //     <Sidebar collapsible="none" className="border-r-0 bg-slate-950 text-slate-100">
// //       {/* Header */}
// //       <SidebarHeader className="border-b border-slate-800 py-6">
// //         <div className="flex items-center gap-3 px-4">
// //           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
// //             <CheckSquare className="h-6 w-6 text-white" />
// //           </div>
// //           <div>
// //             {/* <h2 className="text-xl font-bold">TaskFlow</h2> */}
// //             <h2 className="text-xl font-bold !text-white">TaskFlow</h2>
// //             <p className="text-xs text-slate-400">Productivity Manager</p>
// //           </div>
// //         </div>
// //       </SidebarHeader>

// //       <SidebarContent className="px-3 py-4">
// //         <SidebarGroup>
// //           <SidebarGroupLabel className="mb-2 text-xs uppercase tracking-widest text-slate-500">
// //             Main Menu
// //           </SidebarGroupLabel>
// //           <SidebarGroupContent>
// //             <SidebarMenu className="space-y-1">
// //               {items.map((item) => (
// //                 <SidebarMenuItem key={item.title}>
// //                   {/* No SidebarMenuButton – NavLink styles directly */}
// //                   <NavLink
// //                     to={item.url}
// //                     end={item.url === "/" || item.url === "/tasks"}  
// //                     className={({ isActive }) =>
// //                       `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
// //                         isActive
// //                           ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
// //                           : "text-slate-300 hover:bg-slate-800 hover:text-white"
// //                       }`
// //                     }
// //                   >
// //                     <item.icon className="h-5 w-5" />
// //                     <span>{item.title}</span>
// //                   </NavLink>
// //                 </SidebarMenuItem>
// //               ))}
// //             </SidebarMenu>
// //           </SidebarGroupContent>
// //         </SidebarGroup>
// //       </SidebarContent>

// //       {/* Footer */}
// //       <SidebarFooter className="border-t border-slate-800 p-3">
// //         <SidebarMenu className="space-y-1">
// //           <SidebarMenuItem>
// //             <NavLink
// //               to="/settings"
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
// //                   isActive
// //                     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-1 ring-indigo-400/30"
// //                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
// //                 }`
// //               }
// //             >
// //               <Settings className="h-5 w-5" />
// //               <span>Settings</span>
// //             </NavLink>
// //           </SidebarMenuItem>
// //         </SidebarMenu>
// //       </SidebarFooter>
// //     </Sidebar>
// //   )
// // }
// import { NavLink, useNavigate } from "react-router-dom"
// import {
//   LayoutDashboard,
//   ListTodo,
//   ClipboardList,
//   SquarePen,
//   Settings,
//   CheckSquare,
//   LogOut,
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
//     url: "/dashboard/tasks",
//     icon: ListTodo,
//   },
//   {
//     title: "Task Detail",
//     url: "/dashboard/tasks/detail",
//     icon: ClipboardList,
//   },
//   {
//     title: "Edit Task",
//     url: "/dashboard/tasks/edit",
//     icon: SquarePen,
//   },
// ]

// export function AppSidebar() {
//   const navigate = useNavigate()

// function handleLogout() {
//   // Clear auth token/session here
//   localStorage.removeItem("token")  // or your auth logic
//   navigate("/login")
// }
//   return (
//     <Sidebar collapsible="none" className="border-r-0 bg-slate-950 text-slate-100">
//       {/* Header */}
//       <SidebarHeader className="border-b border-slate-800 py-6">
//         <div className="flex items-center gap-3 px-4">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
//             <CheckSquare className="h-6 w-6 text-white" />
//           </div>
//           <div>
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
//                   <NavLink
//                     to={item.url}
//                     end={item.url === "/dashboard" || item.url === "/dashboard/tasks"}
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
//               to="/dashboard/settings"
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
//           {/* Logout */}
//     <SidebarMenuItem>
//       <button
//         onClick={handleLogout}
//         className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
//       >
//         <LogOut className="h-5 w-5" />
//         <span>Logout</span>
//       </button>
//     </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  ClipboardList,
  SquarePen,
  Settings,
  CheckSquare,
  LogOut,
  Download,
} from "lucide-react";

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
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";

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
    icon: Download
  }
];

export function AppSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    // import { Sidebar, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
// ... other imports

<Sidebar
  collapsible="icon"
  className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80"
>
  {/* Header */}
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
        <SidebarTrigger className="shrink-0 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 group-data-[collapsible=icon]:hidden" />
      </div>

      {/* Trigger shown alone, centered, only when collapsed */}
      <SidebarTrigger className="hidden rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 group-data-[collapsible=icon]:flex" />
    </div>
  </SidebarHeader>

  {/* Navigation */}
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

  {/* Footer */}
  <SidebarFooter className="border-t border-slate-200/60 p-3 dark:border-slate-800/60 group-data-[collapsible=icon]:px-2">
    <SidebarMenu className="space-y-1">
      <SidebarMenuItem>
        <button
          onClick={handleLogout}
          title="Logout"
          className="mx-auto flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:p-0"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="truncate group-data-[collapsible=icon]:hidden">Logout</span>
        </button>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
  );
}

