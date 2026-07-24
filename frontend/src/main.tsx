import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import { Toaster } from "sonner"
import queryClient from './api/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      
    >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
  
)
