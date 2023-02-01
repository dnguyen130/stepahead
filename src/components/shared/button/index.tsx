import { FunctionComponent, useState } from 'react'
import { useTheme } from '../../../utils/provider'

type NavbarProps = {
  icon: JSX.Element
  active: boolean
}

export const Button: FunctionComponent<NavbarProps> = ({ icon, active }) => {
  const { theme } = useTheme()
  const [page, setPage] = useState('home')

  return (
    <button
      className={
        active
          ? `button-cont-${theme} button-active-${theme}`
          : `button-cont-${theme}`
      }
    >
      <div
        className={
          active
            ? `icon-cont-${theme} icon-active-${theme}`
            : `icon-cont-${theme}`
        }
      >
        {icon}
      </div>
    </button>
  )
}
