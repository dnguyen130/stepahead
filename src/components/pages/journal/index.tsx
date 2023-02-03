import Layout from '../../shared/layout'
import { useTheme } from '../../../utils/provider'

type JournalProps = {}

export default function Journal(fn: JournalProps) {
  const { theme } = useTheme()

  return (
    <Layout>
      <div>journal</div>
    </Layout>
  )
}
