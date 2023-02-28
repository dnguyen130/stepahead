import { SignInWithGoogle } from '@/utils/firebase'

export default function Login(): JSX.Element {
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
