import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'
import { CgMathPlus } from 'react-icons/cg'

export default function AddButtonMobile(): ReactElement {
  const { theme, activeModal, setActiveModal } = useMyContext()

  return (
    <button
      className={
        activeModal !== ''
          ? `addbuttonmobile-active-${theme}`
          : `addbuttonmobile-${theme}`
      }
      onClick={() => {
        setActiveModal('createtask')
      }}
    >
      <div
        className={
          activeModal !== ''
            ? `addiconmobile-active-${theme}`
            : `addiconmobile-${theme}`
        }
      >
        <CgMathPlus size="80%" />
      </div>
    </button>
  )
}
