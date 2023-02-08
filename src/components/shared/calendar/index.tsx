import { useTheme } from '@/utils/provider'

export default function Calendar() {
  const { theme } = useTheme()

  return (
    <section className={`calendarcont-${theme}`}>
      This is the calendar section
    </section>
  )
}
