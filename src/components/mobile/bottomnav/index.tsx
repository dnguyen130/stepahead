import { useTheme } from '@utils/provider'
import NavbarButton from '@components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook } from 'react-icons/fa'

export default function Bottomnav() {
  const { theme } = useTheme()

  return (
    <nav className={`bottomnav-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="/" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="calendar" />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
    </nav>
  )
}
