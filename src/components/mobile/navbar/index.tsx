import { useTheme } from '@utils/provider'
import NavbarButton from '@components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook, FaUserAlt } from 'react-icons/fa'
import AddButtonMobile from '../addbutton'

interface NavbarmobileProps {
  opacity: number
}

export default function Navbarmobile({
  opacity,
}: NavbarmobileProps): JSX.Element {
  const { theme } = useTheme()

  return (
    <nav className={`navmobile-cont-${theme}`} style={{ opacity }}>
      <NavbarButton icon={<FaHome size="100%" />} navLink="/dashboard" />
      <NavbarButton icon={<FaCalendar size="100%" />} navLink="calendar" />
      <AddButtonMobile />
      <NavbarButton icon={<FaBook size="100%" />} navLink="journal" />
      <NavbarButton icon={<FaUserAlt size="100%" />} navLink="profile" />
    </nav>
  )
}
