import { useTheme } from '@utils/provider'

type HomeProps = {}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
    </div>
  )
}
