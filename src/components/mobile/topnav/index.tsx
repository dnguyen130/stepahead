import { FunctionComponent } from 'react'
import { useTheme } from '../../../utils/provider'
import AddButtonMobile from '../addbutton'

type NavbarProps = {}

export default function Topnav() {
  const { theme } = useTheme()

  return (
    <nav className={`topnav-cont-${theme}`}>
      <AddButtonMobile />
    </nav>
  )
}
