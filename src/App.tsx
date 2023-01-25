import { Navbar } from './components/desktop/navbar'
import { Topnav } from './components/mobile/topnav'
import { Bottomnav } from './components/mobile/bottomnav'

import { useTheme } from './utils/provider'

export default function App() {
  const { theme } = useTheme()

  return (
    <div className={`container-${theme}`}>
      <Navbar />
      <Topnav />
      <Bottomnav />
    </div>
  )
}
