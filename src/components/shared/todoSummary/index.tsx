import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { defaultCurrentEventProps } from '../createTask/todoForm'
import { convertTimeString } from '../todo'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'
import styles from '@/styles/variables/export.module.scss'

const options: Record<string, string | number> = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const CssButton = styled(Button)({
  fontFamily: `"Ubuntu", "Arial", sans-serif`,
  backgroundColor: styles.buttonActiveLight,
})

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
            {currentEvent.description !== '' && (
              <p className="todosummarysub">{currentEvent.description}</p>
            )}
            <p className="todosummarysub">
              Created{' '}
              {currentEvent.currentDate.toLocaleString('en-us', options)} at{' '}
              {convertTimeString(currentEvent.currentTime)}
            </p>
            <p className="todosummarysub">
              Due {currentEvent.dueDate.toLocaleString('en-us', options)}
              {currentEvent.dueTime !== '' &&
                ` at ${convertTimeString(currentEvent.dueTime)}`}
            </p>
            <CssButton
              variant="contained"
              sx={{
                '&: hover': {
                  backgroundColor: styles.successLight,
                },
              }}
              onClick={() => {
                EditTodo()
              }}
            >
              Edit
            </CssButton>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
