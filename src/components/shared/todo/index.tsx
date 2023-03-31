import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask from './todoTask'
import { TodoDataProps } from '@/utils/types'
import { DeleteTodo } from '@/utils/functions'
import { onValue, ref } from 'firebase/database'
import { db } from '@/utils/firebase'

function areArraysEqual(
  array1: TodoDataProps[],
  array2: TodoDataProps[]
): boolean {
  // If the arrays have different length, they are not equal
  if (array1.length !== array2.length) {
    return false
  }

  // Iterate over each element of the arrays and compare them
  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i]
    const obj2 = array2[i]

    // If the objects are not equal, the arrays are not equal
    if (!areObjectsEqual(obj1, obj2)) {
      return false
    }
  }

  // If we reach this point, the arrays are equal
  return true
}

function areObjectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  // If the objects have different number of keys, they are not equal
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }

  // Iterate over each key of the objects and compare their values
  for (const key of keys1) {
    const value1 = obj1[key]
    const value2 = obj2[key]

    // If the values are not equal, the objects are not equal
    if (value1 !== value2) {
      return false
    }
  }

  // If we reach this point, the objects are equal
  return true
}

export default function Todo(): ReactElement {
  const {
    theme,
    currentUser,
    todos,
    setTodos,
    setActiveModal,
    setCurrentEvent,
  } = useMyContext()
  const todoRef = ref(db, `users/${currentUser.uid}/todos`)

  const DeleteATodo = async (todo: TodoDataProps): Promise<void> => {
    await DeleteTodo(todo)
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const dataArray = Object.values<TodoDataProps>(data)
        if (!areArraysEqual(dataArray, todos)) {
          setTodos(dataArray)
        }
      } else if (data === null) {
        setTodos([])
      }
    })
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
                onDeleteClick={async (e) => {
                  e.stopPropagation()
                  await DeleteATodo(o)
                }}
                onCompleteClick={async (e) => {
                  e.stopPropagation()
                  await DeleteATodo(o)
                }}
                onTodoClick={(e) => {
                  e.stopPropagation()
                  setActiveModal('todosummary')
                  setCurrentEvent({
                    title: o.title,
                    description: o.description,
                    currentDate: new Date(o.creationDate),
                    currentTime: o.creationTime,
                    dueDate: new Date(o.dueDate),
                    dueTime: o.dueTime,
                    important: o.important,
                    complete: o.complete,
                  })
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
