import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface ContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  page: string
  setPage: Dispatch<SetStateAction<string>>
}

type ThemeProviderProps = {
  children?: ReactNode
}

const initialStates = {
  theme: 'light',
  setTheme: () => {},
  page: '',
  setPage: () => {},
}

const Context = createContext<ContextType>(initialStates)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(initialStates.theme)
  const [page, setPage] = useState(initialStates.page)

  return (
    <Context.Provider value={{ theme, setTheme, page, setPage }}>
      {children}
    </Context.Provider>
  )
}

export function useTheme() {
  const { theme, setTheme } = useContext(Context)
  return { theme, setTheme }
}

export function usePage() {
  const { page, setPage } = useContext(Context)
  return { page, setPage }
}
