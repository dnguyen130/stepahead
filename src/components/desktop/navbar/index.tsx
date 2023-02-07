import { FunctionComponent } from 'react'
import { useTheme } from '@utils/provider'
import NavbarButton from '@components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook } from 'react-icons/fa'
import ProfileIcon from '@/components/shared/profileicon'

export default function Navbar({}) {
  const { theme } = useTheme()

  return (
    <nav className={`navbar-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="/" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="calendar" />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
      <ProfileIcon />
    </nav>
  )
}
