import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'
import { AiFillHome } from 'react-icons/ai'

type NavbarProps = {
  label: string
}

export const Button: FunctionComponent<NavbarProps> = ({ label }) => {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <button className={`button-cont-${theme}`}>
      <h4>{label}</h4>
    </button>
  )
}
