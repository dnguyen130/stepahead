import { SignInWithGoogle } from '@/utils/firebase'
import { ReactElement } from 'react'

export default function Login(): ReactElement {
  return (
    <div className="login">
      <div>Login Page</div>
      <div className="inputcont">
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="password">Password</label>
        <input id="password" />
        <button onClick={SignInWithGoogle}>Domo</button>
      </div>
    </div>
  )
}
