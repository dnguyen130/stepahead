import { ReactElement } from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage(): ReactElement {
  const error = useRouteError()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error instanceof Error && <i>{error.message}</i>}</p>
    </div>
  )
}
