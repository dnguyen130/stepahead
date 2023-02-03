import Layout from '@components/shared/layout'
import { useTheme } from '@utils/provider'

type CalendarProps = {
  homeRoute: () => void
  journalRoute: () => void
}

export default function Calendar(fn: CalendarProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <h1>THIS IS THE CALENDAR PAGE</h1>
      <button onClick={fn.homeRoute}>Home</button>
      <button onClick={fn.journalRoute}>Journal</button>
    </Layout>
  )
}
