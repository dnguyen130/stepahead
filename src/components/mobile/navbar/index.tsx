import { useMyContext } from '@/utils/provider'
import NavbarButton from '@/components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook, FaUserAlt } from 'react-icons/fa'
import AddButtonMobile from '../addbutton'
import { ReactElement } from 'react'

export default function Navbarmobile(): ReactElement {
  const { theme } = useMyContext()

  return (
    <nav className={`navmobile-cont-${theme}`}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="dashboard" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="tasks" />
      <AddButtonMobile />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
      <NavbarButton icon={<FaUserAlt size="100%" />} navLink="profile" />
    </nav>
  )
}
