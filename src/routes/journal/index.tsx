import Todo from '@/components/shared/todo'
import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { Helmet } from 'react-helmet'

export default function Journal(): ReactElement {
  const { taskFilter } = useMyContext()

  return (
    <section className="homecont">
      <Helmet>
        <title>Journal Entries</title>
      </Helmet>
      <header>
        <h1 className="homecontgreeting">Journal</h1>
      </header>
      <Todo todoType={taskFilter} journal={true} />
    </section>
  )
}
