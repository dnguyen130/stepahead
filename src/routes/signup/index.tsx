import { ReactElement, useState } from 'react'
import { SignUpWithEmail } from '@/utils/functions'

export default function SignUp(): ReactElement {
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const SignUp = async (): Promise<void> => {
    const signUpEmail = signUpCredentials.email
    const signUpPassword = signUpCredentials.password
    const confirmPassword = signUpCredentials.confirmPassword
    try {
      if (signUpPassword === confirmPassword) {
        const res = await SignUpWithEmail({
          email: signUpEmail,
          password: signUpPassword,
        })
        if (res === 'auth/email-already-in-use') {
          alert('Email already in use')
        }
      } else if (signUpPassword !== confirmPassword) {
        alert('Passwords do not match')
      }
    } catch (err) {
      console.log(err)
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
        <button onClick={SignUp}>Check</button>
      </div>
    </div>
  )
}
