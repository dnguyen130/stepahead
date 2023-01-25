import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'
import { Button } from '../../shared/button'

type NavbarProps = {}

export const Navbar: FunctionComponent<NavbarProps> = ({}) => {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <nav className={`navbar-cont-${theme}`}>
      <Button label="Home" />
      <Button label="Calendar" />
      <Button label="Journal" />
    </nav>
  )
}
