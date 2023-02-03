import Layout from '../../shared/layout'
import { useTheme, usePage } from '../../../utils/provider'

export default function Journal() {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <Layout key="journal">
      <div>journal</div>
      <button onClick={() => setPage('home')}>Home</button>
      <button onClick={() => setPage('calendar')}>Calendar</button>
    </Layout>
  )
}
