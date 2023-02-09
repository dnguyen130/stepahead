import { useTheme } from '@/utils/provider'
import todoData from '@/utils/fakeTodoData.json'

import TodoTask from './todoTask'

export default function Todo() {
  const { theme } = useTheme()

  return (
    <section className={`todocont-${theme}`}>
      {todoData.map((o) => (
        <TodoTask
          todoId={o.uid}
          title={o.title}
          description={o.description}
          creationDate={o.creationDate}
          dueDate={o.dueDate}
          important={o.important}
        />
      ))}
    </section>
  )
}
