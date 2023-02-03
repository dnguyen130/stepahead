import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useTheme, usePage } from './utils/provider'
import Home from './pages/home'
import Calendar from './pages/calendar'
import Journal from './pages/journal'

export default function App() {
  const { theme } = useTheme()

  const { page, setPage } = usePage()

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
        {page == 'journal' && (
          <Calendar
            key="journal"
            homeRoute={() => setPage('home')}
            journalRoute={() => setPage('calendar')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
