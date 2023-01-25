import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'

type NavbarProps = {}

export const Bottomnav: FunctionComponent<NavbarProps> = ({}) => {
  const { theme } = useTheme()
  console.log(theme)

  return <nav className={`bottomnav-cont-${theme}`}></nav>
}
