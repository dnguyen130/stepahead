import Layout from '../../shared/layout'
import { useTheme } from '../../../utils/provider'

type JournalProps = {
  homeRoute: () => void
  calendarRoute: () => void
}

export default function Journal(fn: JournalProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <h1>THIS IS THE JOURNAL PAGE</h1>
      <button onClick={fn.homeRoute}>Home</button>
      <button onClick={fn.calendarRoute}>Calendar</button>
    </Layout>
  )
}
