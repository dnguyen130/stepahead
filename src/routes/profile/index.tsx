import { SignOut } from '@/utils/firebasefunctions'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from '@/utils/provider'
import { TodoDataProps } from '@/utils/types'
import { Helmet } from 'react-helmet'

export default function Profile(): ReactElement {
  const { todos, journals } = useMyContext()
  const navigate = useNavigate()

  const SignOutAndRedirect = async (): Promise<void> => {
    await SignOut()
    navigate('/')
  }

  const CalculateCompletedTodos = (todos: TodoDataProps[]): number => {
    const completedTodos = todos.filter((todo) => todo.complete)
    return completedTodos.length
  }

  return (
    <section className="homecont">
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <header>
        <h1 className="homecontgreeting">Profile</h1>
      </header>
      <main className="profilecont">
        <p className="profileinfo">Current Tasks: {todos.length}</p>
        <p className="profileinfo">
          Tasks Completed: {CalculateCompletedTodos(todos)}
        </p>
        <p className="profileinfo">Journal Entries: {journals.length}</p>
      </main>
      <button
        className="loginbutton signoutbutton"
        onClick={SignOutAndRedirect}
      >
        <h2>Sign Out</h2>
      </button>
    </section>
  )
}
