import { useTheme } from '@utils/provider'

import Todo from '@/components/shared/todo'
import Calendar from '@/components/shared/calendar'

import data from '@/utils/fakeUserData.json'

const morning = (hour: number) => {
  return hour >= 6 && hour <= 11
}
const afternoon = (hour: number) => {
  return hour >= 12 && hour <= 16
}
const evening = (hour: number) => {
  return hour >= 17 && hour <= 23
}

export default function Home() {
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
      <header>
        <h2>
          {welcomeMessage} {data.firstName}
        </h2>
      </header>
      <section className="content">
        <Todo />
        <Calendar />
      </section>
    </section>
  )
}
