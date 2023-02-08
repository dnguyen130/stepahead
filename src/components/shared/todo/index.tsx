import { useTheme } from '@/utils/provider'

export default function Todo() {
  const { theme } = useTheme()

  return (
    <section className={`todocont-${theme}`}>This is the todo section</section>
  )
}
