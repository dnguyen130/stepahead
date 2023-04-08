import Todo from '@/components/shared/todo'
import { ReactElement } from 'react'

export default function Calendar(): ReactElement {
  return (
    <section className="homecont">
      <Todo todoType="all" />
    </section>
  )
}
