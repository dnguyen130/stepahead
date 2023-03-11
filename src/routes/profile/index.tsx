import { SignOut } from '@/utils/functions'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(): ReactElement {
  const navigate = useNavigate()

  const SignOutAndRedirect = async (): Promise<void> => {
    await SignOut()
    navigate('/')
  }

  return (
    <div>
      <h1>THIS IS THE PROFILE PAGE</h1>
      <button onClick={SignOutAndRedirect}>Sign Out</button>
    </div>
  )
}
