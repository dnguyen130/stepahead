import { FaPlus } from 'react-icons/fa'
import { useMyContext } from '@/utils/provider'
import { IconContext } from 'react-icons'
import { ReactElement } from 'react'

export default function AddButtonDesktop(): ReactElement {
  const { theme, activeModal, setActiveModal } = useMyContext()

  return (
    <button
      className={
        activeModal !== ''
          ? `addbuttondesktop-active-${theme}`
          : `addbuttondesktop-${theme}`
      }
      onClick={() => {
        setActiveModal('createtask')
      }}
    >
      <IconContext.Provider
        value={{
          className:
            activeModal !== ''
              ? `addicondesktop-active-${theme}`
              : `addicondesktop-${theme}`,
        }}
      >
        <FaPlus size="100%" />
      </IconContext.Provider>
    </button>
  )
}
