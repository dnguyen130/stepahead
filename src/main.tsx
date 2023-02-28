import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/app.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@utils/provider'
import Root from '@/App'
import ErrorPage from '@components/error'
import Home from '@routes/home'
import Calendar from '@routes/calendar'
import Journal from '@routes/journal'
import Profile from '@routes/profile'
import Login from './routes/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Home />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'journal',
        element: <Journal />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        index: true,
        element: <Login />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
