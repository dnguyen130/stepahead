import { NavLink } from 'react-router-dom'

import { useTheme } from '@utils/provider'

interface NavbarProps {
  icon: JSX.Element
  navLink: string
}

export default function NavbarButton({
  icon,
  navLink,
}: NavbarProps): JSX.Element {
  const { theme } = useTheme()

  return (
    <NavLink
      to={navLink}
      className={({ isActive }) =>
        isActive
          ? `navbarbutton-${theme} navbarbutton-active-${theme}`
          : `navbarbutton-${theme}`
      }
    >
      <div className="navbaricon">{icon}</div>
    </NavLink>
  )
}
