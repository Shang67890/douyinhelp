import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import AppealAgent from './pages/AppealAgent'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/appeal-agent', element: <AppealAgent /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)