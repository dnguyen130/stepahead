import Layout from './components/shared/layout'
import { useTheme, usePage } from './utils/provider'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './components/pages/home'
import Calendar from './components/pages/calendar'
import Journal from './components/pages/journal'

export default function App() {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <AnimatePresence>
      <div className={`container-${theme}`}>
        {page == 'home' && <Home />}
        {page == 'calendar' && <Calendar />}
        {page == 'journal' && <Journal />}
      </div>
    </AnimatePresence>
  )
}
