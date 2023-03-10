import { ReactElement, useState } from 'react'
import { SignUpWithEmail } from '@/utils/functions'
import { useNavigate } from 'react-router-dom'

export default function SignUp(): ReactElement {
  const navigate = useNavigate()
  const ReturnToLogin = (): void => {
    navigate('/')
  }
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const SignUp = async (): Promise<void> => {
    const signUpEmail = signUpCredentials.email
    const signUpPassword = signUpCredentials.password
    const confirmPassword = signUpCredentials.confirmPassword
    if (signUpPassword === confirmPassword) {
      await SignUpWithEmail({
        email: signUpEmail,
        password: signUpPassword,
      })
    } else if (signUpPassword !== confirmPassword) {
      alert('Passwords do not match')
    }
  }

  return (
    <div className="login">
      <div>Sign Up Page</div>
      <div className="inputcont">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setSignUpCredentials({
              ...signUpCredentials,
              email: e.target.value,
            })
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setSignUpCredentials({
              ...signUpCredentials,
              password: e.target.value,
            })
          }}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={(e) => {
            setSignUpCredentials({
              ...signUpCredentials,
              confirmPassword: e.target.value,
            })
          }}
        />
        <button onClick={SignUp}>Sign Up</button>
        <button onClick={ReturnToLogin}>Return to Login</button>
      </div>
    </div>
  )
}
