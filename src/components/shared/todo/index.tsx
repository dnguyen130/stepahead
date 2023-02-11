import { useTheme } from '@/utils/provider'
import todoData from '@/utils/fakeTodoData.json'

import TodoTask, { ToDoTaskProps } from './todoTask'
import { useEffect } from 'react'

export default function Todo() {
  const { theme } = useTheme()
  let sortedArray: Array<ToDoTaskProps> = []

  const sortedTodos = () => {
    const todoMap = Object.values(todoData)
    const todoArray = [...todoMap]
    sortedArray = todoArray.sort((key1, key2): number => {
      const importantkey1 = key1.important
      const importantkey2 = key2.important
      if (importantkey1 == false && importantkey2 == true) {
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
      {sortedArray.map((o) => {
        return (
          <TodoTask
            key={o.uid}
            uid={o.uid}
            title={o.title}
            description={o.description}
            creationDate={o.creationDate}
            dueDate={o.dueDate}
            important={o.important}
            complete={o.complete}
          />
        )
      })}
    </section>
  )
}
