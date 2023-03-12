import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react'

interface ContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  currentUser: Record<string, any>
  setCurrentUser: Dispatch<SetStateAction<{ uid: string; name: string }>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  initialLoad: boolean
  setInitialLoad: Dispatch<SetStateAction<boolean>>
  activeModal: boolean
  setActiveModal: Dispatch<SetStateAction<boolean>>
}

const initialStates = {
  theme: 'light',
  setTheme: () => {},

  currentUser: { uid: '', name: '' },
  setCurrentUser: () => {},

  loading: true,
  setLoading: () => {},

  initialLoad: false,
  setInitialLoad: () => {},

  activeModal: false,
  setActiveModal: () => {},
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
  }
}
