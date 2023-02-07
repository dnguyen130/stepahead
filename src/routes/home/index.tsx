import { useTheme } from '@utils/provider'

type HomeProps = {}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()

  return (
    <section className={`homecont-${theme}`}>
      <h1>THIS IS THE HOME PAGE</h1>
    </section>
  )
}
