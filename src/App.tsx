import { useState, useEffect, ReactElement } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useMyContext } from '@utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from './utils/firebase'

import Navbar from '@components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@components/desktop/addbutton'
import Loading from './components/shared/loading'

const AnimatedOutlet = (): ReactElement => {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export default function App(): ReactElement {
  const { theme, currentUser, setCurrentUser, loading, setLoading } =
    useMyContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setActiveUser(true)
        navigate('/dashboard')
      } else if (user == null) {
        setActiveUser(false)
      }
    })
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser != null && currentUser.uid === '') {
      setCurrentUser({
        uid: auth.currentUser.uid,
        name:
          auth.currentUser.displayName !== null
            ? auth.currentUser.displayName
            : '',
      })
    } else if (auth.currentUser == null && currentUser.uid !== '') {
      setCurrentUser({
        uid: '',
        name: '',
      })
    }
  })

  console.log(auth.currentUser)

  return (
    <div className={loading ? 'maincont noscroll' : 'maincont'}>
      <AnimatePresence>{loading && <Loading />}</AnimatePresence>
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
    </div>
  )
}
