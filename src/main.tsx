import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/app.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@utils/provider'
import Root from '@routes/root'
import ErrorPage from '@components/error'
import Home from '@routes/home'
import Calendar from '@routes/calendar'
import Journal from '@routes/journal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
