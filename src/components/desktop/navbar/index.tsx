import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'
import { Button } from '../../shared/button'
import { FaHome, FaCalendar, FaBook } from 'react-icons/fa'

type NavbarProps = {}

export const Navbar: FunctionComponent<NavbarProps> = ({}) => {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <nav className={`navbar-cont-${theme}`}>
      <Button icon={<FaHome size="100%" />} active />
      <Button icon={<FaCalendar size="100%" />} active={false} />
      <Button icon={<FaBook size="100%" />} active={false} />
    </nav>
  )
}
