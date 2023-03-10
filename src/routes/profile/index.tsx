import { SignOut } from '@/utils/functions'
import { ReactElement } from 'react'

export default function Profile(): ReactElement {
  const SignOutAndRedirect = async (): Promise<void> => {
    await SignOut()
  }

  return (
    <div>
      <h1>THIS IS THE PROFILE PAGE</h1>
      <button onClick={SignOutAndRedirect}>Sign Out</button>
    </div>
  )
}
