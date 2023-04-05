import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { defaultCurrentEventProps } from '../createTask/todoForm'

export default function TodoSummary(): ReactElement {
  const { activeModal, setActiveModal, currentEvent, setCurrentEvent } =
    useMyContext()

  function EditTodo(): void {
    setActiveModal('createtask')
  }

  return (
    <AnimatePresence mode="wait">
      {activeModal === 'todosummary' && (
        <motion.div
          className="createtaskcont"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
          transition={{
            type: 'linear',
            duration: 0.1,
          }}
        >
          <header className="todosummaryheader">
            <button
              className="exitbutton"
              onClick={() => {
                setActiveModal('')
                setCurrentEvent(defaultCurrentEventProps)
              }}
            >
              <MdClose size="100%" />
            </button>
          </header>
          <section className="todosummarycontent">
            <h2 className="todosummarytitle">{currentEvent.title}</h2>
            <p className="todosummarytitle">{currentEvent.description}</p>
            <p className="todosummarytitle">
              {currentEvent.currentDate.toDateString()}
              {currentEvent.uid}
            </p>
            <p className="todosummarytitle">{currentEvent.currentTime}</p>
            <p className="todosummarytitle">
              {currentEvent.dueDate.toDateString()}
            </p>
            <p className="todosummarytitle">{currentEvent.dueTime}</p>
            <p className="todosummarytitle">
              {currentEvent.important.toString()}
            </p>
            <p className="todosummarytitle">
              {currentEvent.complete.toString()}
            </p>
            <button
              onClick={() => {
                EditTodo()
              }}
            >
              Edit
            </button>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
