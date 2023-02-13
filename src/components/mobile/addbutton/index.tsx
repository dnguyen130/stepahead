import { useTheme } from '@utils/provider'
import { CgMathPlus } from 'react-icons/cg'

export default function AddButtonMobile(): JSX.Element {
  const { theme } = useTheme()

  return (
    <button className={`addbuttonmobile-${theme}`}>
      <div className={`addiconmobile-${theme}`}>
        <CgMathPlus size="80%" />
      </div>
    </button>
  )
}
