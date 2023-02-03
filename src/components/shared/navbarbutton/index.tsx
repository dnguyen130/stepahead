import { FunctionComponent, useState } from 'react'
import { useTheme } from '../../../utils/provider'

type NavbarProps = {
  icon: JSX.Element
  active: boolean
  navbarOnClick: () => void
}

export default function NavbarButton(fn: NavbarProps) {
  const { theme } = useTheme()

  return (
    <button
      className={
        fn.active
          ? `navbarbutton-${theme} navbarbutton-active-${theme}`
          : `navbarbutton-${theme}`
      }
      onClick={fn.navbarOnClick}
    >
      <div
        className={
          fn.active
            ? `navbaricon-${theme} navbaricon-active-${theme}`
            : `navbaricon-${theme}`
        }
      >
        {fn.icon}
      </div>
    </button>
  )
}
