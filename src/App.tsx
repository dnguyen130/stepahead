import { useState } from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { useTheme } from '@utils/provider'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from '@components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@components/desktop/addbutton'

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export default function App() {
  const { theme } = useTheme()
  const location = useLocation()

  return (
    <>
      <Navbar />
      <Navbarmobile />
      <AddButtonDesktop />
      <section className={`container-${theme}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'linear',
              duration: 0.2,
            }}
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
