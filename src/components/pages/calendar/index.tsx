import Layout from '../../shared/layout'
import { useTheme } from '../../../utils/provider'

type CalendarProps = {
  homeRoute: () => void
  journalRoute: () => void
}

export default function Calendar(fn: CalendarProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <div>calendar</div>
      <button onClick={fn.homeRoute}>Home</button>
      <button onClick={fn.journalRoute}>Journal</button>
    </Layout>
  )
}
