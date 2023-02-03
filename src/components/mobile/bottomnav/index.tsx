import { useTheme, usePage } from '@utils/provider'
import NavbarButton from '@components/shared/navbarbutton'
import { FaHome, FaCalendar, FaBook } from 'react-icons/fa'

export default function Bottomnav() {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <nav className={`bottomnav-cont-${theme}`}>
      <NavbarButton
        icon={<FaHome size="100%" />}
        active={page == 'home'}
        navLink="home"
      />
      <NavbarButton
        icon={<FaCalendar size="100%" />}
        active={page == 'calendar'}
        navLink="calendar"
      />
      <NavbarButton
        icon={<FaBook size="100%" />}
        active={page == 'journal'}
        navLink="journal"
      />
    </nav>
  )
}
