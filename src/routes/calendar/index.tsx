import { useTheme } from '@utils/provider'

type CalendarProps = {}

export default function Calendar(fn: CalendarProps) {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE CALENDAR PAGE</h1>
    </div>
  )
}
