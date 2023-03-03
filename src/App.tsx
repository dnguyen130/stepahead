import { useState, useEffect, ReactElement } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useMyContext } from '@utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from './utils/firebase'

import Navbar from '@components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@components/desktop/addbutton'

const AnimatedOutlet = (): ReactElement => {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export default function App(): ReactElement {
  const { theme, currentUser, setCurrentUser } = useMyContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        navigate('/dashboard')
        setActiveUser(true)
      } else if (user == null) {
        setActiveUser(false)
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser != null && currentUser.uid === null) {
      setCurrentUser({
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      })
    } else if (auth.currentUser == null && currentUser.uid !== null) {
      setCurrentUser({
        uid: null,
        name: null,
      })
    }
  })

  return (
    <>
      <AnimatePresence>
        {activeUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeUser ? 1 : 0 }}
            exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
            transition={{
              type: 'linear',
              duration: 0.2,
            }}
          >
            <Navbar key="navbar" />
            <Navbarmobile key="navbarmobile" />
            <AddButtonDesktop key="addbutton" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
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
          <section
            className={
              activeUser ? `container-${theme}` : `logincontainer-${theme}`
            }
          >
            <AnimatedOutlet />
          </section>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
