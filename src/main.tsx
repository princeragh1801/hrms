import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import {Dashboard, Departments, Employees, Login, Projects, Tasks} from './pages/index.ts';
import PostEmployee from './components/PostEmployee.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
            <Dashboard />
        ),
      },
      {
        path: 'employee',
        element: <Employees/>,
        
      },
      {
        path: 'employee/post/:employeeId?',
        element: <PostEmployee/>,
        
      },
      {
        path: 'department',
        element: (
            <Departments />
        ),
      },
      {
        path: 'project',
        element: (
            <Projects />
        ),
      },
      {
        path: 'task',
        element: (
            <Tasks />
        ),
      },
      {
        path: 'login',
        element: (
            <Login />
        ),
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
