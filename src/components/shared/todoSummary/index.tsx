import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { ConvertTimeString } from '@/utils/functions'
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
  width: '200px',
})

export default function TodoSummary(): ReactElement {
  const {
    activeModal,
    setActiveModal,
    currentEvent,
    setCurrentEvent,
    currentJournal,
    setCurrentJournal,
  } = useMyContext()

  function EditTodo(type: string): void {
    setActiveModal(type === 'todosummary' ? 'edittask' : 'editjournal')
  }

  const defaultCurrentEventProps = {
    uid: currentEvent.uid !== '' ? currentEvent.uid : '',
    title: '',
    description: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
    dueDate: new Date(),
    dueTime: '',
    important: false,
    complete: false,
  }

  const defaultJournalProps = {
    uid: currentJournal.uid !== '' ? currentJournal.uid : '',
    title: '',
    content: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
  }

  return (
    <AnimatePresence mode="wait">
      {(activeModal === 'todosummary' || activeModal === 'journalsummary') && (
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
                setCurrentJournal(defaultJournalProps)
              }}
            >
              <MdClose size="100%" />
            </button>
          </header>
          <section className="todosummarycontent">
            <h2 className="todosummarytitle">
              {activeModal === 'todosummary'
                ? currentEvent.title
                : currentJournal.title}
            </h2>
            <p className="todosummarysub">{currentEvent.description}</p>
            {currentJournal.content !== '' && (
              <p className="todosummaryjournal">{currentJournal.content}</p>
            )}
            <div className="todosummarydates">
              <p className="todosummarysub">
                Created{' '}
                {activeModal === 'todosummary'
                  ? currentEvent.currentDate.toLocaleString('en-us', options)
                  : currentJournal.currentDate.toLocaleString(
                      'en-us',
                      options
                    )}{' '}
                at{' '}
                {activeModal === 'todosummary'
                  ? ConvertTimeString(currentEvent.currentTime)
                  : ConvertTimeString(currentJournal.currentTime)}
              </p>
              {activeModal === 'todosummary' && (
                <p className="todosummarysub">
                  Due {currentEvent.dueDate.toLocaleString('en-us', options)}
                  {currentEvent.dueTime !== '' &&
                    ` at ${ConvertTimeString(currentEvent.dueTime)}`}
                </p>
              )}
            </div>
            <CssButton
              variant="contained"
              sx={{
                '&: hover': {
                  backgroundColor: styles.successLight,
                },
              }}
              onClick={() => {
                EditTodo(activeModal)
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
