import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'
import { NavbarButton } from '../../shared/navbarbutton'
import { FaHome, FaCalendar, FaBook } from 'react-icons/fa'

type NavbarProps = {}

export const Navbar: FunctionComponent<NavbarProps> = ({}) => {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <nav className={`navbar-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} active />
      <NavbarButton icon={<FaCalendar size="100%" />} active={false} />
      <NavbarButton icon={<FaBook size="100%" />} active={false} />
    </nav>
  )
}
