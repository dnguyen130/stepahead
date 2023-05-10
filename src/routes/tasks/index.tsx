import Todo from '@/components/shared/todo'
import TodoSwitches from '@/components/shared/todo/todoSwitches'
import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'

export default function Tasks(): ReactElement {
  const { taskFilter } = useMyContext()

  return (
    <section className="homecont">
      <header>
        <h1 className="homecontgreeting">Tasks</h1>
        <TodoSwitches />
      </header>
      <Todo todoType={taskFilter} journal={false} />
    </section>
  )
}
