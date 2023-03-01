import { FaPlus } from 'react-icons/fa'
import { useTheme } from '@utils/provider'
import { IconContext } from 'react-icons'

interface AddbuttonDesktopProps {
  opacity: number
}

export default function AddButtonDesktop({
  opacity,
}: AddbuttonDesktopProps): JSX.Element {
  const { theme } = useTheme()

  return (
    <button className={`addbuttondesktop-${theme}`} style={{ opacity }}>
      <IconContext.Provider value={{ className: `addicondesktop-${theme}` }}>
        <FaPlus size="100%" />
      </IconContext.Provider>
    </button>
  )
}
