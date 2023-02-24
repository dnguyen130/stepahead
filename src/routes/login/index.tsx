import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/utils/firebase'

export default function Login(): JSX.Element {
  const SignInWithGoogle = async (): Promise<void> => {
    try {
      console.log('start')
      const res = await signInWithPopup(auth, googleProvider)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
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
      </div>
    </div>
  )
}
