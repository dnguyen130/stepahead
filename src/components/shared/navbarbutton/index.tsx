import { FunctionComponent, useState } from 'react'
import { useTheme } from '../../../utils/provider'

type NavbarProps = {
  icon: JSX.Element
  active: boolean
}

export const NavbarButton: FunctionComponent<NavbarProps> = ({
  icon,
  active,
}) => {
  const { theme } = useTheme()
  const [page, setPage] = useState('home')

  return (
    <button
      className={
        active
          ? `navbarbutton-${theme} navbarbutton-active-${theme}`
          : `navbarbutton-${theme}`
      }
    >
      <div
        className={
          active
            ? `navbaricon-${theme} navbaricon-active-${theme}`
            : `navbaricon-${theme}`
        }
      >
        {icon}
      </div>
    </button>
  )
}
