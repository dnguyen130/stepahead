import { BsStarFill } from 'react-icons/bs'
import { VscCircleFilled } from 'react-icons/vsc'
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'
import { useMyContext } from '@/utils/provider'
import { ReactElement } from 'react'
import { TodoTaskProps } from '@/utils/types'

export default function TodoTask({
  userId,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
  onDeleteClick,
  onCompleteClick,
}: TodoTaskProps): ReactElement {
  const { theme } = useMyContext()

  return (
    <section className="todotaskcont">
      <div
        className={
          important
            ? `todotaskicon-${theme}-important`
            : `todotaskicon-${theme}-basic`
        }
      >
        {important ? (
          <BsStarFill size="100%" />
        ) : (
          <VscCircleFilled size="100%" />
        )}
      </div>
      <h3 className="todotasktitle">{title}</h3>
      <div className="todotaskicondelete" onClick={onDeleteClick}>
        <IoMdCloseCircle size="80%" />
      </div>
      <div className="todotaskiconcomplete" onClick={onCompleteClick}>
        <IoMdCheckmarkCircle size="80%" />
      </div>
    </section>
  )
}
