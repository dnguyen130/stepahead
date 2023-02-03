import Layout from '../../shared/layout'
import { useTheme, usePage } from '../../../utils/provider'

export default function Calendar() {
  const { theme } = useTheme()
  const { page, setPage } = usePage()

  return (
    <Layout key="calendar">
      <div>calendar</div>
      <button onClick={() => setPage('home')}>Home</button>
      <button onClick={() => setPage('journal')}>Journal</button>
    </Layout>
  )
}
