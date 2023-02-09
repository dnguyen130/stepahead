import { useTheme } from '@utils/provider'

export default function Profile() {
  const { theme } = useTheme()

  return (
    <div>
      <h1>THIS IS THE PROFILE PAGE</h1>
    </div>
  )
}
