import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme, usePage } from '@utils/provider'

type NavbarProps = {
  icon: JSX.Element
  active: boolean
  navLink: string
}

export default function NavbarButton(fn: NavbarProps) {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <Link
      to={{
        pathname: fn.navLink,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      onClick={() => setPage(fn.navLink)}
    >
      <button
        className={
          fn.active
            ? `navbarbutton-${theme} navbarbutton-active-${theme}`
            : `navbarbutton-${theme}`
        }
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
    </Link>
  )
}
