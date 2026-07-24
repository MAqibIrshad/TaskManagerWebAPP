import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000",
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default api
export type RegisterData = {
  username: string
  email: string
  password: string
}

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data)
  return response.data
}

export type LoginData = {
  email: string
  password: string
}

export async function loginUser(data: LoginData) {
  const response = await api.post("/auth/login", data)
  return response.data
}
export async function reorderTasks(taskIds: number[]) {
  const response = await api.put("/tasks/reorder", {
    task_ids: taskIds,
  })

  return response.data
}
export async function getTasks(
  categoryId?: number
) {
  const response = await api.get("/tasks", {
    params: {
      category_id: categoryId,
    },
  })

  return response.data
}
export async function deleteTask(id: number) {
  await api.delete(`/tasks/${id}`)
}
export async function createTask(
  title: string,
  description: string,
  category_id: number,
  milestone?: string,
  tags?: string[]
) {
  const response = await api.post("/tasks/", {
    title,
    description,
    category_id,
    milestone,
    tags,
  })

  return response.data
}
export async function generateDescription(title: string) {
  const token = localStorage.getItem("token")

  const response = await api.post(
    "/tasks/generate-description",
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
export async function getTask(id: number) {
  const response = await api.get(`/tasks/${id}`)
  return response.data
}
export async function downloadTaskPdf(id: number) {
  const response = await api.get(
    `/tasks/${id}/pdf`,
    {
      responseType: "blob",
    }
  )

  const blob = new Blob([response.data], {
    type: "application/pdf",
  })

  const url = window.URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `task_${id}_report.pdf`

  document.body.appendChild(link)
  link.click()

  link.remove()

  window.URL.revokeObjectURL(url)
}
export async function updateTask(
  id: number,
  title: string,
  description:string,
  completed: boolean,
  milestone:string,
  tags:string[]
) {
  const response = await api.put(`/tasks/${id}`, {
    title,
    description,
    completed,
    milestone,
    tags
  })

  return response.data


}export async function toggleTask(
  id: number,
  completed: boolean
) {
  const response = await api.put(`/tasks/${id}`, {
    completed,
  })

  return response.data
}
export async function getCategories() {
  const response = await api.get("/categories")
  return response.data
}
export async function getDashboard(activePage:number, completedPage:number, limit:number) {
  const response = await api.get("/tasks/dashboard",
    {
      params: {
        active_page: activePage,
        completed_page: completedPage,
        limit: limit,
      },
    }
  )
  return response.data
}

export async function getDashboardStats() {
  const response = await api.get("/tasks/dashboard/stats")
  return response.data
}
export interface WeeklyTask {
  day: string
  completed: number
}

export async function getWeeklyTasks(): Promise<WeeklyTask[]> {
  const response = await api.get<WeeklyTask[]>("/tasks/dashboard/weekly")
  return response.data
}

export async function getActiveTasks(
  skip: number,
  limit: number
) {
  const response = await api.get("/tasks/dashboard/active", {
    params: {
      skip,
      limit,
    },
  })

  return response.data
}

export async function getCompletedTasks(
  skip: number,
  limit: number
) {
  const response = await api.get("/tasks/dashboard/completed", {
    params: {
      skip,
      limit,
    },
  })

  return response.data
}

export async function uploadTaskResource(
  taskId: number,
  file: File
) {
  const formData = new FormData()

  formData.append("file", file)

  const response = await api.post(
    `/tasks/${taskId}/resource`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data

}