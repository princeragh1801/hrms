import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import {Dashboard, Departments, Employees, Projects, Tasks} from './pages/index.ts';

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
        element: (
            <Employees />
        ),
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
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
