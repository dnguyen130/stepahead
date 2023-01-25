import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'

type NavbarProps = {}

export const Topnav: FunctionComponent<NavbarProps> = ({}) => {
  const { theme } = useTheme()
  console.log(theme)

  return <nav className={`topnav-cont-${theme}`}></nav>
}
