import { SignInWithGoogle } from '@/utils/functions'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(): ReactElement {
  const navigate = useNavigate()

  const NavigateToSignUp = (): void => {
    navigate('/signup')
  }

  return (
    <div className="login">
      <div>Login Page</div>
      <div className="inputcont">
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="password">Password</label>
        <input id="password" />
        <button onClick={SignInWithGoogle}>Domo</button>
        <button onClick={NavigateToSignUp}>Sign Up</button>
      </div>
    </div>
  )
}
