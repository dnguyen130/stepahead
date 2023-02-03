import Layout from '../../shared/layout'
import { useTheme, usePage } from '../../../utils/provider'

export default function Home() {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <Layout key="home">
      <div>home</div>
      <button onClick={() => setPage('calendar')}>Calendar</button>
      <button onClick={() => setPage('journal')}>Journal</button>
    </Layout>
  )
}
