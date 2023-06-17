import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import TodoTask from './todoTask'
import JournalTask from './journalTask'
import { TodoDataProps, JournalProps } from '@/utils/types'
import {
  DeleteTodo,
  DeleteJournal,
  CompleteATodo,
} from '@/utils/firebasefunctions'
import {
  AreArraysEqual,
  RecentChecker,
  GenerateDaysMessage,
  DaysLeft,
  GenerateTodoTitle,
  GenerateTodoEmptyText,
} from '@/utils/functions'
import { onValue, ref } from 'firebase/database'
import { db } from '@/utils/firebase'

interface TodoProps {
  journal: boolean
  todoType: string
}

export default function Todo({ todoType, journal }: TodoProps): ReactElement {
  const {
    theme,
    currentUser,
    todos,
    setTodos,
    journals,
    setJournals,
    setCurrentJournal,
    setActiveModal,
    setCurrentEvent,
  } = useMyContext()
  const todoRef = ref(db, `users/${currentUser.uid}/todos`)
  const journalRef = ref(db, `users/${currentUser.uid}/journals`)

  const DeleteATodo = async (todo: TodoDataProps): Promise<void> => {
    await DeleteTodo(todo)
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const dataArray = Object.values<TodoDataProps>(data)
        if (!AreArraysEqual(dataArray, todos)) {
          setTodos(dataArray)
        }
      } else if (data === null) {
        setTodos([])
      }
    })
  }

  const CompleteTodo = async (todo: TodoDataProps): Promise<void> => {
    await CompleteATodo({
      uid: todo.uid,
      userId: todo.userId,
      title: todo.title,
      description: todo.description,
      creationDate: todo.creationDate,
      creationTime: todo.creationTime,
      dueDate: todo.dueDate,
      dueTime: todo.dueTime !== null ? todo.dueTime : '',
      important: todo.important,
      complete: true,
    })
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const dataArray = Object.values<TodoDataProps>(data)
        if (!AreArraysEqual(dataArray, todos)) {
          setTodos(dataArray)
        }
      } else if (data === null) {
        setTodos([])
      }
    })
  }

  const DeleteAJournal = async (journal: JournalProps): Promise<void> => {
    await DeleteJournal(journal)
    onValue(journalRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        const dataArray = Object.values<JournalProps>(data)
        if (!AreArraysEqual(dataArray, todos)) {
          setJournals(dataArray)
        }
      } else if (data === null) {
        setJournals([])
      }
    })
  }

  const sortedTodos = (): TodoDataProps[] => {
    let sortedArray: TodoDataProps[] = []
    if (todos !== null) {
      const todoMap = Object.values(todos)
      const todoArray = [...todoMap]
      sortedArray = todoArray.sort((key1, key2): number => {
        const dueDate1 = Date.parse(key1.dueDate)
        const dueDate2 = Date.parse(key2.dueDate)
        const dueTime1 = key1.dueTime
        const dueTime2 = key2.dueTime

        if (dueDate1 < dueDate2) {
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

  const sortedJournals = (): JournalProps[] => {
    let sortedArray: JournalProps[] = []
    if (journals !== null) {
      const journalMap = Object.values(journals)
      const journalArray = [...journalMap]
      sortedArray = journalArray.sort((key1, key2): number => {
        const dueDate1 = Date.parse(key1.creationDate)
        const dueDate2 = Date.parse(key2.creationDate)
        const dueTime1 = key1.creationTime
        const dueTime2 = key2.creationTime

        if (dueDate1 < dueDate2) {
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

  const filteredTodos = (todoType: string): TodoDataProps[] => {
    if (todos !== null) {
      console.log(todos)
      switch (todoType) {
        case 'upcoming': {
          return sortedTodos().filter((todo) =>
            RecentChecker(todo.dueDate, todo.complete)
          )
        }
        case 'today': {
          return sortedTodos().filter(
            (todo) =>
              Date.parse(todo.dueDate) ===
                Date.parse(new Date().toDateString()) && !todo.complete
          )
        }
        case 'expired': {
          return sortedTodos().filter(
            (todo) =>
              Date.parse(todo.dueDate) < Date.parse(new Date().toDateString())
          )
        }
        case 'complete': {
          return sortedTodos().filter((todo) => todo.complete)
        }
        default: {
          return sortedTodos()
        }
      }
    } else {
      return []
    }
  }

  if (journal) {
    return (
      <section className={`todocont-${theme}`}>
        {sortedJournals().length !== 0 &&
          sortedJournals().map((o, i) => {
            return (
              <div key={i}>
                <JournalTask
                  key={i}
                  uid={o.uid}
                  userId={o.userId}
                  title={o.title}
                  content={o.content}
                  creationDate={o.creationDate}
                  creationTime={o.creationTime}
                  onDeleteClick={async (e) => {
                    e.stopPropagation()
                    await DeleteAJournal(o)
                  }}
                  onCompleteClick={async (e) => {
                    e.stopPropagation()
                    await DeleteAJournal(o)
                  }}
                  onTodoClick={(e) => {
                    e.stopPropagation()
                    setActiveModal('journalsummary')
                    setCurrentJournal({
                      uid: o.uid,
                      title: o.title,
                      content: o.content,
                      currentDate: new Date(o.creationDate),
                      currentTime: o.creationTime,
                    })
                  }}
                />
                {/* Remove last underline in list */}
                {i + 1 !== filteredTodos(todoType).length && (
                  <div className="underline" />
                )}
              </div>
            )
          })}
        {sortedJournals().length === 0 && (
          <div className="notaskscont">No journal entries</div>
        )}
      </section>
    )
  } else {
    return (
      <section className={`todocont-${theme}`}>
        <h2>{GenerateTodoTitle(todoType)}</h2>
        {filteredTodos(todoType).length !== 0 &&
          filteredTodos(todoType).map((o, i) => {
            return (
              <div key={i}>
                <TodoTask
                  key={i}
                  todoDays={GenerateDaysMessage(
                    DaysLeft(o.dueDate),
                    o.dueTime,
                    o.complete
                  )}
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
                    await CompleteTodo(o)
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
                {i + 1 !== filteredTodos(todoType).length && (
                  <div className="underline" />
                )}
              </div>
            )
          })}
        {filteredTodos(todoType).length === 0 && (
          <div className="notaskscont">{GenerateTodoEmptyText(todoType)}</div>
        )}
      </section>
    )
  }
}
