import Todo from '@/components/shared/todo'
import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'

const morning = (hour: number): boolean => {
  return hour >= 6 && hour <= 11
}
const afternoon = (hour: number): boolean => {
  return hour >= 12 && hour <= 16
}
const evening = (hour: number): boolean => {
  return hour >= 17 && hour <= 23
}

export default function Home(): ReactElement {
  const { currentUser } = useMyContext()

  // Date and welcome message
  let welcomeMessage
  const currentHour = new Date().getHours()
  if (morning(currentHour)) {
    welcomeMessage = 'Good morning'
  } else if (afternoon(currentHour)) {
    welcomeMessage = 'Good afternoon'
  } else if (evening(currentHour)) {
    welcomeMessage = 'Good evening'
  } else {
    welcomeMessage = 'Up late or up early today'
  }
  const date = new Date()
  const options: Record<string, string | number> = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const today = date.toLocaleString('en-us', options)

  return (
    <section className="homecont">
      <header>
        <h1 className="homecontgreeting">
          {currentUser.name !== null && (
            <>
              {welcomeMessage}
              {currentUser.name !== '' && ', '}
              {currentUser.name}
            </>
          )}
        </h1>
        <h2 className="homecontdate">Today is</h2>
        <h2 className="homecontdate">{today} </h2>
      </header>
      <section className="content">
        <Todo todoType="today" />
        <Todo todoType="upcoming" />
      </section>
    </section>
  )
}
