import { Outlet } from 'react-router-dom'
import { useTheme } from '@utils/provider'

import Navbar from '@components/desktop/navbar'
import Topnav from '@components/mobile/topnav'
import Bottomnav from '@components/mobile/bottomnav'
import AddButtonDesktop from '@components/desktop/addbutton'

export default function Root() {
  const { theme } = useTheme()

  return (
    <>
      <Navbar />
      <Topnav />
      <Bottomnav />
      <AddButtonDesktop />
      <div className={`container-${theme}`}>
        <Outlet />
      </div>
    </>
  )
}
