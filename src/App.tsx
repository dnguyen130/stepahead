import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useTheme } from './utils/provider'
import Home from './components/pages/home'
import Calendar from './components/pages/calendar'
import Journal from './components/pages/journal'

export default function App() {
  const { theme } = useTheme()

  const [page, setPage] = useState('home')

  return (
    <div className={`container-${theme}`}>
      <AnimatePresence mode="wait">
        {page == 'home' && (
          <Home
            key="home"
            calendarRoute={() => setPage('calendar')}
            journalRoute={() => setPage('journal')}
          />
        )}
        {page == 'calendar' && (
          <Calendar
            key="calendar"
            homeRoute={() => setPage('home')}
            journalRoute={() => setPage('journal')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
