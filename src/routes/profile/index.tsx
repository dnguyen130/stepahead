import { SignOut } from '@/utils/firebasefunctions'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(): ReactElement {
  const navigate = useNavigate()

  const SignOutAndRedirect = async (): Promise<void> => {
    await SignOut()
    navigate('/')
  }

  return (
    <section className="homecont">
      <header>
        <h1 className="homecontgreeting">Profile</h1>
      </header>
      <button onClick={SignOutAndRedirect}>Sign Out</button>
    </section>
  )
}
