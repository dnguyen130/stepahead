import Layout from '@components/shared/layout'
import { useTheme } from '@utils/provider'

type HomeProps = {
  calendarRoute: () => void
  journalRoute: () => void
}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <h1>THIS IS THE HOME PAGE</h1>
      <button onClick={fn.calendarRoute}>Calendar</button>
      <button onClick={fn.journalRoute}>Journal</button>
    </Layout>
  )
}
