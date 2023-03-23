import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask from './todoTask'
import { TodoDataProps } from '@/utils/types'

export default function Todo(): ReactElement {
  const { theme, todos } = useMyContext()

  let sortedArray: TodoDataProps[] = []
  const sortedTodos = (): TodoDataProps[] => {
    if (todos !== null) {
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
    }
    return sortedArray
  }

  sortedTodos()

  return (
    <section className={`todocont-${theme}`}>
      {sortedArray.length !== 0 &&
        sortedArray.map((o, i) => {
          return (
            <div key={i}>
              <TodoTask
                key={i}
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
      {sortedArray.length === 0 && (
        <div className="notaskscont">No Tasks Created</div>
      )}
    </section>
  )
}
