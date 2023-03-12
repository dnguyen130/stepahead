import { FaPlus } from 'react-icons/fa'
import { useMyContext } from '@utils/provider'
import { IconContext } from 'react-icons'
import { ReactElement } from 'react'

export default function AddButtonDesktop(): ReactElement {
  const { theme, setActiveModal } = useMyContext()

  return (
    <button
      className={`addbuttondesktop-${theme}`}
      onClick={() => {
        setActiveModal(true)
      }}
    >
      <IconContext.Provider value={{ className: `addicondesktop-${theme}` }}>
        <FaPlus size="100%" />
      </IconContext.Provider>
    </button>
  )
}
