import { useState, useEffect } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useTheme } from '@utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from './utils/firebase'

import Navbar from '@components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@components/desktop/addbutton'

const AnimatedOutlet = (): React.ReactElement => {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export default function App(): JSX.Element {
  const { theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setActiveUser(true)
        navigate('/dashboard')
      }
    })
  }, [])

  return (
    <>
      {activeUser && (
        <AnimatePresence>
          <Navbar key="navbar" />
          <Navbarmobile key="navbarmobile" />
          <AddButtonDesktop key="addbutton" />
        </AnimatePresence>
      )}
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
