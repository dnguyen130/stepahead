import { SignInWithGoogle, LogInWithEmail } from '@/utils/functions'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  })

  const GoogleSignIn = async (): Promise<void> => {
    const res = await SignInWithGoogle()
    // Figure out how to route on successful sign in
  }

  const NavigateToSignUp = (): void => {
    navigate('/signup')
  }

  const Login = async (): Promise<void> => {
    const loginEmail = loginCredentials.email
    const loginPassword = loginCredentials.password
    await LogInWithEmail({
      email: loginEmail,
      password: loginPassword,
    })
  }

  return (
    <div className="login">
      <div>Login Page</div>
      <div className="inputcont">
        <label htmlFor="email">Username</label>
        <input
          id="email"
          type="email"
          onChange={(e) => {
            setLoginCredentials({ ...loginCredentials, email: e.target.value })
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => {
            setLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }}
        />
        <button onClick={GoogleSignIn}>Google Sign In</button>
        <button onClick={NavigateToSignUp}>Sign Up</button>
        <button onClick={Login}>Login</button>
      </div>
    </div>
  )
}
