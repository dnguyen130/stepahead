import { useTheme } from '../../../utils/provider'

export default function AddButtonMobile() {
  const { theme } = useTheme()

  return (
    <button className={`addbuttonmobile-${theme}`}>
      <div className={`addiconmobile-${theme}`}>+</div>
    </button>
  )
}
