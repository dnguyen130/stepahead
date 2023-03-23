import { useState, useEffect, ReactElement } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from '@/utils/firebase'
import { GetAllTodos } from './utils/functions'
import { TodoDataProps } from './utils/types'

import Navbar from '@/components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@/components/desktop/addbutton'
import Loading from './components/shared/loading'
import CreateTask from './components/shared/createTask'
import BackgroundDim from './components/shared/backgroundDim'

const AnimatedOutlet = (): ReactElement => {
  const o = useOutlet()
  const [outlet] = useState(o)
  return <>{outlet}</>
}

export default function App(): ReactElement {
  const {
    theme,
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    setInitialLoad,
    todos,
    setTodos,
  } = useMyContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCurrentUser({
          uid: user.uid,
          name: user.displayName !== null ? user.displayName : '',
          email: user.email !== null ? user.email : '',
        })
        setLoading(true)
        if (location.pathname === '/' || location.pathname === '/signup') {
          navigate('/dashboard')
        }
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => {
          clearTimeout(timer)
        }
      } else if (user == null) {
        setCurrentUser({
          uid: '',
          name: '',
          email: '',
        })
        setTodos([])
        if (location.pathname !== '/' && location.pathname !== '/signup') {
          navigate('/')
        }
      }
    })
    setInitialLoad(true)

    console.log(todos)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (currentUser.uid !== '') {
      const GetInitialTodos = async (uid: string): Promise<void> => {
        const res = await GetAllTodos(uid)
        console.log(res)
        console.log(currentUser.uid)
        if (res !== null) {
          const initialTodosArray: TodoDataProps[] = Object.values(res)
          console.log(initialTodosArray)
          setTodos(initialTodosArray)
        }
      }
      GetInitialTodos(currentUser.uid).then(
        () => {},
        () => {}
      )
    }
  }, [currentUser])

  return (
    <div className={loading ? 'maincont noscroll' : 'maincont'}>
      <Loading />
      <CreateTask />
      <BackgroundDim />
      <AnimatePresence mode="wait">
        {currentUser.uid !== '' && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              currentUser.uid !== '' && !loading
                ? `container-${theme}`
                : `logincontainer-${theme}`
            }
          >
            <AnimatedOutlet />
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
