import { FunctionComponent } from 'react'
import { useTheme } from '@utils/provider'
import AddButtonMobile from '@components/mobile/addbutton'
import ProfileIcon from '@/components/shared/profileicon'

type NavbarProps = {}

export default function Topnav() {
  const { theme } = useTheme()

  return (
    <nav className={`topnav-cont-${theme}`}>
      <ProfileIcon />
      <AddButtonMobile />
    </nav>
  )
}
