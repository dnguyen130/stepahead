import { NavLink } from 'react-router-dom'

import { useTheme } from '@/utils/provider'

export default function ProfileIcon() {
  const { theme } = useTheme()

  return (
    <NavLink
      to="profile"
      className={({ isActive }) =>
        isActive ? `profileicon-active-${theme}` : `profileicon-${theme}`
      }
    >
      <img className="profileimg" src="https://placekitten.com/100/100" />
    </NavLink>
  )
}
