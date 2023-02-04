import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useTheme, usePage } from '@utils/provider'

type NavbarProps = {
  icon: JSX.Element
  active: boolean
  navLink: string
}

export default function NavbarButton(fn: NavbarProps) {
  const { theme } = useTheme()
  const { page, setPage } = usePage()
  const location = useLocation().pathname
  //Remove leading slash from pathname
  const locationNoSlash = location.slice(1)

  //On startup, set active navbar button to current link
  useEffect(() => {
    if (locationNoSlash != page && location != '/') {
      console.log(location)
      setPage(locationNoSlash)
      //If location is home aka /
    } else if (location == '/') {
      setPage(location)
    } else {
      return
    }
  }, [])

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
      <motion.button
        id="navbarbutton"
        className={
          fn.active
            ? `navbarbutton-${theme} navbarbutton-active-${theme}`
            : `navbarbutton-${theme}`
        }
      >
        <motion.div
          className={
            fn.active
              ? `navbaricon-${theme} navbaricon-active-${theme}`
              : `navbaricon-${theme}`
          }
        >
          {fn.icon}
        </motion.div>
      </motion.button>
    </Link>
  )
}
