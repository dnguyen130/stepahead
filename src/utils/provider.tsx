import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react'

import {
  UserDataProps,
  TodoDataProps,
  CurrentEventProps,
  JournalProps,
  CurrentJournalProps,
} from './types'

interface ContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  currentUser: UserDataProps
  setCurrentUser: Dispatch<SetStateAction<UserDataProps>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  initialLoad: boolean
  setInitialLoad: Dispatch<SetStateAction<boolean>>
  activeModal: string
  setActiveModal: Dispatch<SetStateAction<string>>
  todos: TodoDataProps[]
  setTodos: Dispatch<SetStateAction<TodoDataProps[]>>
  currentEvent: CurrentEventProps
  setCurrentEvent: Dispatch<SetStateAction<CurrentEventProps>>
  journals: JournalProps[]
  setJournals: Dispatch<SetStateAction<JournalProps[]>>
  currentJournal: CurrentJournalProps
  setCurrentJournal: Dispatch<SetStateAction<CurrentJournalProps>>
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

  activeModal: '',
  setActiveModal: () => {},

  todos: [
    {
      uid: '',
      userId: '',
      title: '',
      description: '',
      creationDate: '',
      creationTime: '',
      dueDate: '',
      dueTime: '',
      important: false,
      complete: false,
    },
  ],
  setTodos: () => {},

  currentEvent: {
    uid: '',
    title: '',
    description: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
    dueDate: new Date(),
    dueTime: '',
    important: false,
    complete: false,
  },
  setCurrentEvent: () => {},

  journals: [
    {
      uid: '',
      userId: '',
      title: '',
      content: '',
      creationDate: '',
      creationTime: '',
    },
  ],
  setJournals: () => {},

  currentJournal: {
    uid: '',
    title: '',
    content: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
  },

  setCurrentJournal: () => {},
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
  const [currentEvent, setCurrentEvent] = useState(initialStates.currentEvent)
  const [journals, setJournals] = useState(initialStates.journals)
  const [currentJournal, setCurrentJournal] = useState(
    initialStates.currentJournal
  )

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
        currentEvent,
        setCurrentEvent,
        journals,
        setJournals,
        currentJournal,
        setCurrentJournal,
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
    currentEvent,
    setCurrentEvent,
    journals,
    setJournals,
    currentJournal,
    setCurrentJournal,
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
    currentEvent,
    setCurrentEvent,
    journals,
    setJournals,
    currentJournal,
    setCurrentJournal,
  }
}
