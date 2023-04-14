import { SignInWithGoogle, LogInWithEmail } from '@/utils/firebasefunctions'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMyContext } from '@/utils/provider'
import { MdPlaylistAddCheck } from 'react-icons/md'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import styles from '@/styles/variables/export.module.scss'
import { FcGoogle } from 'react-icons/fc'

const CssTextField = styled(TextField)({
  margin: '10px 0',
  input: {
    color: styles.bgLight,
  },
  '& label': {
    color: styles.bgLight,
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
  },
  '& label.Mui-focused': {
    color: styles.bgLight,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: styles.bgLight,
    },
    '&:hover fieldset': {
      borderColor: styles.bgLight,
    },
    '&.Mui-focused fieldset': {
      borderColor: styles.bgLight,
    },
  },
})

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const { loading } = useMyContext()
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
          <div className="loginlogo">
            <MdPlaylistAddCheck size="100%" />
            <h1>Let&apos;s get ahead</h1>
          </div>
          <div className="inputcont">
            <CssTextField
              required
              type="email"
              label="Email"
              variant="outlined"
              value={loginCredentials.email}
              onChange={(newValue) => {
                setLoginCredentials({
                  ...loginCredentials,
                  email: newValue.target.value,
                })
              }}
            />
            <CssTextField
              required
              type="password"
              label="Password"
              variant="outlined"
              value={loginCredentials.password}
              onChange={(newValue) => {
                setLoginCredentials({
                  ...loginCredentials,
                  password: newValue.target.value,
                })
              }}
            />
            <button className="loginbutton" onClick={Login}>
              <div></div>
              <h2>Login</h2>
            </button>
            <p>or</p>
            <button className="loginbutton" onClick={NavigateToSignUp}>
              <div></div>
              <h2>Sign Up</h2>
            </button>
            <button className="loginbuttonicon" onClick={GoogleSignIn}>
              <FcGoogle size="100%" />
              <h2>Google Sign In</h2>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
