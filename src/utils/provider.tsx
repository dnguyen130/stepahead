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
  setCurrentUser: Dispatch<SetStateAction<Record<string, any>>>
}

interface ThemeProviderProps {
  children?: ReactNode
}

const initialStates = {
  theme: 'light',
  setTheme: () => {},

  currentUser: {},
  setCurrentUser: () => {},
}

const Context = createContext<ContextType>(initialStates)

export function AppProvider({ children }: ThemeProviderProps): ReactElement {
  const [theme, setTheme] = useState(initialStates.theme)
  const [currentUser, setCurrentUser] = useState(initialStates.currentUser)

  return (
    <Context.Provider value={{ theme, setTheme, currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  )
}

export function useMyContext(): ContextType {
  const { theme, setTheme, currentUser, setCurrentUser } = useContext(Context)
  return { theme, setTheme, currentUser, setCurrentUser }
}
