import { BsDot, BsStarFill } from 'react-icons/bs'
import { useTheme } from '@/utils/provider'

export interface ToDoTaskProps {
  uid: number
  title: string
  description: string
  creationDate: number
  dueDate: number
  important: boolean
  complete: boolean
}

export default function TodoTask({
  uid,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
}: ToDoTaskProps) {
  const { theme } = useTheme()

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
