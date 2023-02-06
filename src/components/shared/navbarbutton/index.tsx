import { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useTheme, usePage } from '@utils/provider'
import styles from '@/styles/variables/export.module.scss'

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
  const navigate = useNavigate()

  //On startup, set active navbar button to current link
  useLayoutEffect(() => {
    if (locationNoSlash != page && location != '/') {
      setPage(locationNoSlash)
      //If location is home aka /
    } else if (location == '/') {
      setPage(location)
    } else {
      return
    }
  }, [])

  function navigatePage(link: string) {
    navigate(link)
    setPage(link)
  }

  const buttonVariants = {
    inactiveButton: {
      backgroundColor: styles.bg2light,
      transition: { duration: 0.2 },
    },
    activeButton: {
      backgroundColor: styles.buttonActiveLight,
      transition: { duration: 0.2 },
    },
    inactiveIcon: {
      color: styles.bglight,
      transition: { duration: 0.2 },
    },
    activeIcon: {
      color: styles.iconActiveLight,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.button
      id="navbarbutton"
      className={`navbarbutton-${theme}`}
      onClick={() => navigatePage(fn.navLink)}
      variants={buttonVariants}
      initial={'inactiveButton'}
      animate={fn.active ? 'activeButton' : 'inactiveButton'}
    >
      <motion.div
        className={`navbaricon-${theme}`}
        variants={buttonVariants}
        initial={'inactiveIcon'}
        animate={fn.active ? 'activeIcon' : 'inactiveIcon'}
      >
        {fn.icon}
      </motion.div>
    </motion.button>
  )
}
