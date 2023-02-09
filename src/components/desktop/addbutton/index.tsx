import { FaPlus } from 'react-icons/fa'
import { useTheme } from '@utils/provider'
import { IconContext } from 'react-icons'

export default function AddButtonDesktop() {
  const { theme } = useTheme()

  return (
    <button className={`addbuttondesktop-${theme}`}>
      <IconContext.Provider value={{ className: `addicondesktop-${theme}` }}>
        <FaPlus size="100%" />
      </IconContext.Provider>
    </button>
  )
}
