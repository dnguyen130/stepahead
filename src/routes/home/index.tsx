import { useTheme, usePage } from '@utils/provider'

type HomeProps = {}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()
  const { page } = usePage()

  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
      <button onClick={() => console.log(page)}>Aweh</button>
    </div>
  )
}
