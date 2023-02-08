import { useTheme } from '@utils/provider'

import Todo from '@/components/shared/todo'
import Calendar from '@/components/shared/calendar'

import data from '@/utils/fakeData.json'

type HomeProps = {}

const morning = (hour: number) => {
  return hour >= 6 && hour <= 11
}
const afternoon = (hour: number) => {
  return hour >= 12 && hour <= 16
}
const evening = (hour: number) => {
  return hour >= 17 && hour <= 23
}

export default function Home(fn: HomeProps) {
  const { theme } = useTheme()
  const currentHour = new Date().getHours()
  let welcomeMessage

  if (morning(currentHour)) {
    welcomeMessage = 'Good morning, '
  } else if (afternoon(currentHour)) {
    welcomeMessage = 'Good afternoon, '
  } else if (evening(currentHour)) {
    welcomeMessage = 'Good evening, '
  } else {
    welcomeMessage = 'Up late or up early today, '
  }

  return (
    <section className={`homecont-${theme}`}>
      <h2>
        {welcomeMessage} {data.firstName}
      </h2>
      <Todo />
      <Calendar />
      <Calendar />
    </section>
  )
}
