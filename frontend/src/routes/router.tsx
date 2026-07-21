import { createBrowserRouter } from "react-router-dom"

import Layout from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import TaskDetails from "@/pages/TaskDetail"
import EditTask from "@/pages/EditTask"
import Settings from "@/pages/Settings"
import NotFound from "@/pages/NotFound"
import Tasks from "@/pages/Tasks"
import TaskEdit from "@/pages/TaskEdit"
import DetailTask from "@/pages/DetailTask"
import TaskDetail from "@/pages/DetailTask"
import AuthLayout from "@/components/AuthLayout"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import HomePage from "@/pages/HomePage"
import ProtectedRoute from "@/components/ProtectedRoute"

export const router = createBrowserRouter([
   {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: (<ProtectedRoute><Layout /></ProtectedRoute>),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tasks/",
        element:<Tasks />
      },
      {
        path: "tasks/:id",
        element: <DetailTask />,
      },
      {
        path: "tasks/detail",
        element: <TaskDetails />,
      },
      {
        path: "tasks/edit",
        element: <TaskEdit />,
      },
      {
        path: "tasks/:id/edit",
        element: <EditTask />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    // Auth routes (no sidebar)
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
])

