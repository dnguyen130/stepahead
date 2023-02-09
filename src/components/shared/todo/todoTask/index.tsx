import { BsDot, BsStarFill } from 'react-icons/bs'
import { useTheme } from '@/utils/provider'

export interface ToDoTaskProps {
  uid: number
  title: string
  description: string
  creationDate: number
  dueDate: number
  important: boolean
}

export default function TodoTask({
  uid,
  title,
  description,
  creationDate,
  dueDate,
  important,
}: ToDoTaskProps) {
  const { theme } = useTheme()

  return (
    <div className="todotaskcont">
      <div className={`todotaskicon-${theme}`}>
        {important && <BsStarFill size="100%" />}
      </div>
      <h3>{title}</h3>
    </div>
  )
}
