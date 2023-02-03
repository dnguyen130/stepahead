import { useTheme } from '@utils/provider'

export default function AddButtonDesktop() {
  const { theme } = useTheme()

  return (
    <button className={`addbuttondesktop-${theme}`}>
      <div className={`addicondesktop-${theme}`}>+</div>
    </button>
  )
}
