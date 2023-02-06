import { useLayoutEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useTheme } from '@utils/provider'
import styles from '@/styles/variables/export.module.scss'

type NavbarProps = {
  icon: JSX.Element
  navLink: string
}

export default function NavbarButton(fn: NavbarProps) {
  const { theme } = useTheme()

  return (
    <NavLink
      to={fn.navLink}
      className={({ isActive }) =>
        isActive
          ? `navbarbutton-${theme} navbarbutton-active-${theme}`
          : `navbarbutton-${theme}`
      }
    >
      <div className="navbaricon">{fn.icon}</div>
    </NavLink>
  )
}
