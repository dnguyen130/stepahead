import { BsStarFill } from 'react-icons/bs'
import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'

export interface ToDoTaskProps {
  uid: string
  userId: string
  title: string
  description: string
  creationDate: Date
  creationTime: string
  dueDate: Date
  dueTime: string
  important: boolean
  complete: boolean
}

export default function TodoTask({
  uid,
  userId,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
}: ToDoTaskProps): ReactElement {
  const { theme } = useMyContext()

  return (
    <section className="todotaskcont">
      <div className={`todotaskicon-${theme}`}>
        {important && <BsStarFill size="100%" />}
      </div>
      <label
        htmlFor={title}
        className="todotasktitle"
        style={{
          textDecoration: complete ? 'line-through' : 'none',
        }}
      >
        {title}
      </label>
      <input
        id={title}
        type="checkbox"
        className="todotaskcheckbox"
        name="task"
        onChange={() => (complete = !complete)}
      />
    </section>
  )
}
