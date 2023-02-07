import { useTheme } from '@utils/provider'

type ProfileProps = {}

export default function Profile(fn: ProfileProps) {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE PROFILE PAGE</h1>
    </div>
  )
}
