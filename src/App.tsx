import { useState, useEffect } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useTheme } from '@utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from './utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

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
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        navigate('/dashboard')
        setActiveUser(true)
      } else if (user == null) {
        console.log('wtf')
        setActiveUser(false)
        console.log(activeUser)
      }
    })
  }, [])

  if (loading) {
    return <div>loading</div>
  } else {
    return (
      <>
        <Navbar key="navbar" opacity={activeUser ? 1 : 0} />
        <Navbarmobile key="navbarmobile" opacity={activeUser ? 1 : 0} />
        <AddButtonDesktop key="addbutton" opacity={activeUser ? 1 : 0} />
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
            <section className={`container-${theme}`}>
              <AnimatedOutlet />
            </section>
          </motion.div>
        </AnimatePresence>
      </>
    )
  }
}
