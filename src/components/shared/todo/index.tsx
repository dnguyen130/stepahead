import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask from './todoTask'
import { TodoDataProps } from '@/utils/types'
import { DeleteTodo } from '@/utils/functions'
import { onValue, ref } from 'firebase/database'
import { db } from '@/utils/firebase'

export default function Todo(): ReactElement {
  const { theme, currentUser, todos, setTodos } = useMyContext()

  const todoRef = ref(db, `users/${currentUser.uid}/todos`)
  onValue(todoRef, (snapshot) => {
    const data = snapshot.val()
    console.log(data)
  })

  const DeleteATodo = async (todo: TodoDataProps): Promise<void> => {
    await DeleteTodo(todo)
  }

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
                onDeleteClick={async () => {
                  await DeleteATodo(o)
                }}
                onCompleteClick={async () => {
                  await DeleteATodo(o)
                }}
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
