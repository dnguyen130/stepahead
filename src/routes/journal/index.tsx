import { useTheme } from '@utils/provider'

export default function Journal() {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE JOURNAL PAGE</h1>
    </div>
  )
}
