import { Navbar } from './components/desktop/navbar'
import { Topnav } from './components/mobile/topnav'
import { Bottomnav } from './components/mobile/bottomnav'

import { useTheme } from './utils/provider'
import { AddButtonDesktop } from './components/desktop/addbutton'

export default function App() {
  const { theme } = useTheme()

  return (
    <div className={`container-${theme}`}>
      <AddButtonDesktop />
    </div>
  )
}
