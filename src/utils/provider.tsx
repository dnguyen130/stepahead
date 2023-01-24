import React, { useContext, createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

type ThemeProviderProps = {
  children?: ReactNode
}

const initialStates = {
  theme: "light",
  setTheme: () => {}
}

const ThemeContext = createContext<ThemeContextType>(initialStates);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialStates.theme);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    {children}
  </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
}