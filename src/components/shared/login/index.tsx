import { useState } from 'react'

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login">
      <div>Login Page</div>
      <div className="inputcont">
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="password">Password</label>
        <input id="password" />
        <button>Login</button>
      </div>
    </div>
  )
}
