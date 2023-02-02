import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'

import { ThemeProvider } from './utils/provider'
import { Navbar } from './components/desktop/navbar'
import { Topnav } from './components/mobile/topnav'
import { Bottomnav } from './components/mobile/bottomnav'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Navbar />
      <Topnav />
      <Bottomnav />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
