import { NavLink } from 'react-router-dom'

import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'

interface NavbarProps {
  icon: JSX.Element
  navLink: string
}

export default function NavbarButton({
  icon,
  navLink,
}: NavbarProps): ReactElement {
  const { theme } = useMyContext()

  return (
    <NavLink
      to={navLink}
      className={({ isActive }) =>
        isActive ? `navbarbutton-active-${theme}` : `navbarbutton-${theme}`
      }
    >
      <div className="navbaricon">{icon}</div>
    </NavLink>
  )
}
