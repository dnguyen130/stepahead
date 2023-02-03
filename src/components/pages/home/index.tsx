import Layout from '../../shared/layout'
import { useTheme } from '../../../utils/provider'

type HomeProps = {
  calendarRoute: () => void
  journalRoute: () => void
}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <div>home</div>
      <button onClick={fn.calendarRoute}>Calendar</button>
      <button onClick={fn.journalRoute}>Journal</button>
    </Layout>
  )
}
