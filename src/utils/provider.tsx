import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react'

import { UserDataProps, TodoDataProps } from './types'

interface ContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  currentUser: Record<string, string>
  setCurrentUser: Dispatch<SetStateAction<UserDataProps>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  initialLoad: boolean
  setInitialLoad: Dispatch<SetStateAction<boolean>>
  activeModal: boolean
  setActiveModal: Dispatch<SetStateAction<boolean>>
  todos: TodoDataProps[]
  setTodos: Dispatch<SetStateAction<TodoDataProps[]>>
}

const initialStates = {
  theme: 'light',
  setTheme: () => {},

  currentUser: { uid: '', name: '', email: '' },
  setCurrentUser: () => {},

  loading: true,
  setLoading: () => {},

  initialLoad: false,
  setInitialLoad: () => {},

  activeModal: false,
  setActiveModal: () => {},

  todos: [
    {
      uid: '',
      userId: '',
      title: '',
      description: '',
      creationDate: new Date().toDateString(),
      creationTime: '',
      dueDate: new Date().toDateString(),
      dueTime: '',
      important: false,
      complete: false,
    },
  ],
  setTodos: () => {},
}

const Context = createContext<ContextType>(initialStates)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps): ReactElement {
  const [theme, setTheme] = useState(initialStates.theme)
  const [currentUser, setCurrentUser] = useState(initialStates.currentUser)
  const [loading, setLoading] = useState(initialStates.loading)
  const [initialLoad, setInitialLoad] = useState(initialStates.initialLoad)
  const [activeModal, setActiveModal] = useState(initialStates.activeModal)
  const [todos, setTodos] = useState(initialStates.todos)

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        initialLoad,
        setInitialLoad,
        activeModal,
        setActiveModal,
        todos,
        setTodos,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useMyContext(): ContextType {
  const {
    theme,
    setTheme,
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    initialLoad,
    setInitialLoad,
    activeModal,
    setActiveModal,
    todos,
    setTodos,
  } = useContext(Context)
  return {
    theme,
    setTheme,
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    initialLoad,
    setInitialLoad,
    activeModal,
    setActiveModal,
    todos,
    setTodos,
  }
}
