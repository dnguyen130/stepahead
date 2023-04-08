import { useMyContext } from '@/utils/provider'
import NavbarButton from '@/components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook, FaUserCircle } from 'react-icons/fa'
import { ReactElement } from 'react'

export default function Navbar(): ReactElement {
  const { theme } = useMyContext()

  return (
    <nav className={`navbar-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="dashboard" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="tasks" />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
      <NavbarButton icon={<FaUserCircle size="100%" />} navLink="profile" />
    </nav>
  )
}
