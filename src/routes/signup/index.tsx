import { ReactElement, useState } from 'react'
import { SignUpWithEmail } from '@/utils/firebasefunctions'
import { useNavigate } from 'react-router-dom'
import { MdPlaylistAddCheck } from 'react-icons/md'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material'
import styles from '@/styles/variables/export.module.scss'
import { Helmet } from 'react-helmet'

const CssTextField = styled(TextField)({
  margin: '10px 0',
  input: {
    color: styles.bg2Light,
  },
  '& label': {
    color: styles.bg2Light,
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
  },
  '& label.Mui-focused': {
    color: styles.bg2Light,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: styles.bg2Light,
    },
    '&:hover fieldset': {
      borderColor: styles.bg2Light,
    },
    '&.Mui-focused fieldset': {
      borderColor: styles.bg2Light,
    },
  },
})

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
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
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
          value={signUpCredentials.email}
          onChange={(newValue) => {
            setSignUpCredentials({
              ...signUpCredentials,
              email: newValue.target.value,
            })
          }}
        />
        <CssTextField
          required
          type="password"
          label="Password"
          variant="outlined"
          value={signUpCredentials.password}
          onChange={(newValue) => {
            setSignUpCredentials({
              ...signUpCredentials,
              password: newValue.target.value,
            })
          }}
        />
        <CssTextField
          required
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={signUpCredentials.confirmPassword}
          onChange={(newValue) => {
            setSignUpCredentials({
              ...signUpCredentials,
              confirmPassword: newValue.target.value,
            })
          }}
        />
        <button className="loginbutton" onClick={SignUp}>
          <h2>Sign Up</h2>
        </button>
        <button className="loginbutton" onClick={ReturnToLogin}>
          <h2>Return to Login</h2>
        </button>
      </div>
    </div>
  )
}
