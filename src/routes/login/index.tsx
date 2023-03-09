import { SignInWithGoogle, LogInWithEmail } from '@/utils/functions'
import { FirebaseError } from 'firebase/app'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  })
  const NavigateToSignUp = (): void => {
    navigate('/signup')
  }

  const Login = async (): Promise<unknown> => {
    const loginEmail = loginCredentials.email
    const loginPassword = loginCredentials.password
    try {
      const res = await LogInWithEmail({
        email: loginEmail,
        password: loginPassword,
      })
      if (res instanceof FirebaseError) {
        if (res.code === 'auth/invalid-email') {
          alert('Invalid Email')
        } else if (loginPassword === '' || res.code === 'auth/wrong-password') {
          alert('Invalid Password')
        }
      } else {
        return res
      }
    } catch (err) {
      console.log(err)
    }
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
        <button onClick={SignInWithGoogle}>Google Sign In</button>
        <button onClick={NavigateToSignUp}>Sign Up</button>
        <button onClick={Login}>Login</button>
      </div>
    </div>
  )
}
