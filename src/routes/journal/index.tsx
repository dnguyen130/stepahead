import { useTheme } from '@utils/provider'

type JournalProps = {}

export default function Journal(fn: JournalProps) {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE JOURNAL PAGE</h1>
    </div>
  )
}
