import { useState, useEffect, ReactElement } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { auth } from '@/utils/firebase'
import { GetAllJournals, GetAllTodos } from './utils/firebasefunctions'
import { JournalProps, TodoDataProps } from './utils/types'

import Navbar from '@/components/desktop/navbar'
import Navbarmobile from '@/components/mobile/navbar'
import AddButtonDesktop from '@/components/desktop/addbutton'
import Loading from './components/shared/loading'
import CreateTask from './components/shared/createTask'
import BackgroundDim from './components/shared/backgroundDim'
import TodoSummary from './components/shared/todoSummary'

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
    setJournals,
  } = useMyContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setTodos([])
        setJournals([])
        setLoading(true)
        setCurrentUser({
          uid: user.uid,
          name: user.displayName !== null ? user.displayName : '',
          email: user.email !== null ? user.email : '',
        })
        if (location.pathname === '/' || location.pathname === '/signup') {
          navigate('/dashboard')
        }
      } else if (user == null) {
        setCurrentUser({
          uid: '',
          name: '',
          email: '',
        })
        setTodos([])
        setJournals([])
        if (location.pathname !== '/' && location.pathname !== '/signup') {
          navigate('/')
        }
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => {
          clearTimeout(timer)
        }
      }
    })

    setInitialLoad(true)
  }, [])

  useEffect(() => {
    if (currentUser.uid !== '') {
      const GetInitialData = async (uid: string): Promise<void> => {
        const res = await GetAllTodos(uid)
        const res2 = await GetAllJournals(uid)

        // GetAllTodos returns null if no todo data has been created or an error occurs
        if (res !== null && res2 !== null) {
          const initialTodosArray: TodoDataProps[] = Object.values(res)
          setTodos(initialTodosArray)
          const initialJournalsArray: JournalProps[] = Object.values(res2)
          setJournals(initialJournalsArray)
          setInitialLoad(true)
        }
      }
      GetInitialData(currentUser.uid).then(
        () => {},
        () => {}
      )
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    }

    if (loading && currentUser.uid !== '' && todos.length !== 0) {
      if (todos[0].userId !== '') {
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000)
        return () => {
          clearTimeout(timer)
        }
      }
    }
  }, [currentUser])

  return (
    <div className={loading ? 'maincont noscroll' : 'maincont'}>
      <Loading />
      <CreateTask />
      <TodoSummary />
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
