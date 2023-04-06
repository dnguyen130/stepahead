import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask from './todoTask'
import { TodoDataProps } from '@/utils/types'
import { DeleteTodo } from '@/utils/functions'
import { onValue, ref } from 'firebase/database'
import { db } from '@/utils/firebase'

interface TodoProps {
  todoType: string
}

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

export function DaysLeft(date: string): number {
  const dueDate = new Date(date).valueOf()
  const currentDate = new Date().valueOf()
  const diffTime = dueDate - currentDate
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function GenerateDaysMessage(daysLeft: number, time: string): string {
  if (daysLeft === 0 && time !== '') {
    return `Due today at ${convertTimeString(time)}`
  } else if (daysLeft === 0 && time === '') {
    return 'Due today'
  } else if (daysLeft > 0) {
    return `${daysLeft} days left`
  } else if (daysLeft === -1) {
    return `Expired by ${Math.abs(daysLeft)} day`
  } else {
    return `Expired by ${Math.abs(daysLeft)} days`
  }
}

function recentChecker(date: string): boolean {
  if (DaysLeft(date) > 0 && DaysLeft(date) <= 7) {
    return true
  } else {
    return false
  }
}

export function convertTimeString(timeString: string): string {
  let [hours, minutes] = timeString.split(':')
  let hour = parseInt(hours)
  const amPm = hour < 12 ? 'AM' : 'PM'
  if (hour === 0) {
    hour = 12
  } else if (hour > 12) {
    hour -= 12
  }

  const stringHour = hour.toString()

  if (minutes.length === 1) {
    minutes = '0' + minutes
  }

  return stringHour + ':' + minutes + ' ' + amPm
}

export default function Todo({ todoType }: TodoProps): ReactElement {
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

  const sortedTodos = (): TodoDataProps[] => {
    let sortedArray: TodoDataProps[] = []
    if (todos !== null) {
      const todoMap = Object.values(todos)
      const todoArray = [...todoMap]
      sortedArray = todoArray.sort((key1, key2): number => {
        const dueDate1 = key1.dueDate
        const dueDate2 = key2.dueDate
        const dueTime1 = key1.dueTime
        const dueTime2 = key2.dueTime

        if (dueDate1 > dueDate2) {
          return 1
        } else if (dueDate1 === dueDate2) {
          if (dueTime1 > dueTime2) {
            return 1
          } else {
            return -1
          }
        } else {
          return -1
        }
      })
    }
    return sortedArray
  }

  const todayTodos = (): TodoDataProps[] => {
    if (todos !== null) {
      const todoArray = sortedTodos().filter(
        (todo) => todo.dueDate === new Date().toDateString()
      )
      console.log(todoArray)
      return todoArray
    } else {
      return []
    }
  }

  const upcomingTodos = (): TodoDataProps[] => {
    if (todos !== null) {
      const todoArray = sortedTodos().filter((todo) =>
        recentChecker(todo.dueDate)
      )
      return todoArray
    } else {
      return []
    }
  }

  if (todoType === 'today') {
    return (
      <section className={`todocont-${theme}`}>
        <h2>Today&apos;s Tasks</h2>
        {todayTodos().length !== 0 &&
          todayTodos().map((o, i) => {
            return (
              <div key={i}>
                <TodoTask
                  key={i}
                  uid={o.uid}
                  userId={o.userId}
                  todoDays={GenerateDaysMessage(DaysLeft(o.dueDate), o.dueTime)}
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
                      uid: o.uid,
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
                {i + 1 !== todayTodos().length && <div className="underline" />}
              </div>
            )
          })}
        {todayTodos().length === 0 && (
          <div className="notaskscont">No tasks due today</div>
        )}
      </section>
    )
  } else if (todoType === 'upcoming') {
    return (
      <section className={`todocont-${theme}`}>
        <h2>Upcoming Tasks</h2>
        {upcomingTodos().length !== 0 &&
          upcomingTodos().map((o, i) => {
            return (
              <div key={i}>
                <TodoTask
                  key={i}
                  todoDays={GenerateDaysMessage(DaysLeft(o.dueDate), o.dueTime)}
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
                      uid: o.uid,
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
                {i + 1 !== upcomingTodos().length && (
                  <div className="underline" />
                )}
              </div>
            )
          })}
        {upcomingTodos().length === 0 && (
          <div className="notaskscont">No tasks due today</div>
        )}
      </section>
    )
  } else {
    return (
      <section className={`todocont-${theme}`}>
        <h2>All Tasks</h2>
        {sortedTodos().length !== 0 &&
          sortedTodos().map((o, i) => {
            return (
              <div key={i}>
                <TodoTask
                  key={i}
                  todoDays={GenerateDaysMessage(DaysLeft(o.dueDate), o.dueTime)}
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
                      uid: o.uid,
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
                {i + 1 !== sortedTodos().length && (
                  <div className="underline" />
                )}
              </div>
            )
          })}
        {sortedTodos().length === 0 && (
          <div className="notaskscont">No tasks due today</div>
        )}
      </section>
    )
  }
}
