import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useMyContext } from '@utils/provider'

interface ProtectedRouteProps {
  children: ReactElement
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const { currentUser } = useMyContext()

  if (currentUser.uid === '') {
    console.log('fire')
    return <Navigate to="/" replace />
  }
  return children
}
