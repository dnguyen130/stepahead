import { SignInWithGoogle, LogInWithEmail } from '@/utils/functions'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMyContext } from '@/utils/provider'

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const { currentUser, loading } = useMyContext()
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  })

  const GoogleSignIn = async (): Promise<void> => {
    const res = await SignInWithGoogle()
    // Only a successful login will return an object
    if (typeof res === 'object') {
      navigate('/dashboard')
    }
  }

  const NavigateToSignUp = (): void => {
    navigate('/signup')
  }

  const Login = async (): Promise<void> => {
    const loginEmail = loginCredentials.email
    const loginPassword = loginCredentials.password
    const res = await LogInWithEmail({
      email: loginEmail,
      password: loginPassword,
    })
    if (typeof res === 'object') {
      navigate('dashboard')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {!loading && (
        <motion.div
          className="login"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
          transition={{
            type: 'linear',
            duration: 0.2,
          }}
        >
          <div>Login Page</div>
          <div className="inputcont">
            <label htmlFor="email">Username</label>
            <input
              id="email"
              type="email"
              onChange={(e) => {
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
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
            <button
              onClick={() => {
                console.log(currentUser)
              }}
            >
              User Check
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
