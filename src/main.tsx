import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'
import { ThemeProvider } from './utils/provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
