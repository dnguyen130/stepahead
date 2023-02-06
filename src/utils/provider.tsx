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
}

type ThemeProviderProps = {
  children?: ReactNode
}

const initialStates = {
  theme: 'light',
  setTheme: () => {},
}

const Context = createContext<ContextType>(initialStates)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(initialStates.theme)

  return (
    <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>
  )
}

export function useTheme() {
  const { theme, setTheme } = useContext(Context)
  return { theme, setTheme }
}
