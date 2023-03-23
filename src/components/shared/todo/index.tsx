import { ReactElement, useEffect } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask, { ToDoTaskProps } from './todoTask'

export default function Todo(): ReactElement {
  const { theme, todos } = useMyContext()

  useEffect(() => {}, [todos])

  let sortedArray: ToDoTaskProps[] = []
  const sortedTodos = (): ToDoTaskProps[] => {
    const todoMap = Object.values(todos)
    const todoArray = [...todoMap]
    sortedArray = todoArray.sort((key1, key2): number => {
      const importantkey1 = key1.important
      const importantkey2 = key2.important
      if (!importantkey1 && importantkey2) {
        return 1
      } else {
        return -1
      }
    })
    return sortedArray
  }
  sortedTodos()

  return (
    <section className={`todocont-${theme}`}>
      {sortedArray.map((o, i) => {
        return (
          <div key={o.uid}>
            <TodoTask
              uid={o.uid}
              userId={o.userId}
              title={o.title}
              description={o.description}
              creationDate={o.creationDate}
              creationTime={o.creationTime}
              dueDate={o.dueDate}
              dueTime={o.dueTime}
              important={o.important}
              complete={o.complete}
            />
            {/* Remove last underline in list */}
            {i + 1 !== sortedArray.length && <div className="underline" />}
          </div>
        )
      })}
    </section>
  )
}
