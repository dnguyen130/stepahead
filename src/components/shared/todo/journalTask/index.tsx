import { VscCircleFilled } from 'react-icons/vsc'
import { IoMdCloseCircle } from 'react-icons/io'
import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'
import { JournalTaskProps } from '@/utils/types'

export default function JournalTask({
  title,
  creationDate,
  onDeleteClick,
  onCompleteClick,
  onTodoClick,
}: JournalTaskProps): ReactElement {
  const { theme } = useMyContext()

  return (
    <section className="journaltaskcont" onClick={onTodoClick}>
      <div className={`todotaskicon-${theme}-basic`}>
        <VscCircleFilled size="100%" />
      </div>
      <h3 className="todotasktitle">{title}</h3>
      <h3 className="todotasktitle">{creationDate}</h3>
      <div className="todotaskicondelete" onClick={onDeleteClick}>
        <IoMdCloseCircle size="80%" />
      </div>
    </section>
  )
}
