import { useMyContext } from '@utils/provider'
import { ReactElement } from 'react'
import { CgMathPlus } from 'react-icons/cg'

export default function AddButtonMobile(): ReactElement {
  const { theme } = useMyContext()

  return (
    <button className={`addbuttonmobile-${theme}`}>
      <div className={`addiconmobile-${theme}`}>
        <CgMathPlus size="80%" />
      </div>
    </button>
  )
}
