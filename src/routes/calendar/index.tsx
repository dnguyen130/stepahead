import Layout from '@components/shared/layout'
import { useTheme } from '@utils/provider'

type CalendarProps = {}

export default function Calendar(fn: CalendarProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <h1>THIS IS THE CALENDAR PAGE</h1>
    </Layout>
  )
}
