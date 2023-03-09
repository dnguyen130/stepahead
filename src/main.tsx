import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/app.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppProvider } from '@utils/provider'
import Root from '@/App'
import ErrorPage from '@components/error'
import Home from '@routes/home'
import Calendar from '@routes/calendar'
import Journal from '@routes/journal'
import Profile from '@routes/profile'
import Login from '@routes/login'
import SignUp from '@routes/signup'
import ProtectedRoute from './components/shared/protectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'calendar',
        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        ),
      },
      {
        path: 'journal',
        element: (
          <ProtectedRoute>
            <Journal />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
)
