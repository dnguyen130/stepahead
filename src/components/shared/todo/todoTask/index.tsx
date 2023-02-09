import { BsStar, BsStarFill } from 'react-icons/bs'
import { useTheme } from '@/utils/provider'

interface ToDoTaskProps {
  todoId: number
  title: string
  description: string
  creationDate: number
  dueDate: number
  important: boolean
}

export default function TodoTask({
  todoId,
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
        {important ? <BsStarFill size="100%" /> : <BsStar size="100%" />}
      </div>
      <h3>{title}</h3>
    </div>
  )
}
