import { BsStarFill } from 'react-icons/bs'
import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'
import { TodoDataProps } from '@/utils/types'

export default function TodoTask({
  userId,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
}: TodoDataProps): ReactElement {
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
