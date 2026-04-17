import { StrictMode , lazy} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sileo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/auth'

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const RouteGuard = lazy(() => import("./pages/RouteGuard"));
const Task = lazy(() => import("./components/Task"));
const User = lazy(() => import("./components/User"));
const SettingsPage = lazy(() => import("./components/Settings"));
const DashboardPage = lazy(() => import("./components/Dashboard"));


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {path: "/", element: <LoginPage />},
  {path: "/register", element: <RegisterPage />},
  {path: "/user-page", element: (
    <RouteGuard allowedRoles={["USER"]}>
      <UserPage />
    </RouteGuard>
  )},
  {path: "/admin-page", element: (
    <RouteGuard allowedRoles={["ADMIN"]}>
      <AdminPage />
    </RouteGuard>
  ), children: [
    {path: "tasks" , element: <Task />},
    {path: "users", element: <User />},
    {path: "settings", element: <SettingsPage />},
    {index: true, element: <DashboardPage />}
  ]},
  {path: "*", element: <NotFoundPage />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center">
     <AuthContextProvider>
       <RouterProvider router={router} />
     </AuthContextProvider>
      </Toaster>
    </QueryClientProvider>
  </StrictMode>,
)
