import { useTheme } from '@utils/provider'
import NavbarButton from '@components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook, FaUserCircle } from 'react-icons/fa'

export default function Navbar(): JSX.Element {
  const { theme } = useTheme()

  return (
    <nav className={`navbar-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="/dashboard" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="calendar" />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
      <NavbarButton icon={<FaUserCircle size="100%" />} navLink="profile" />
    </nav>
  )
}
