import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import CreateTaskForm from './todoForm'
import CreateJournalForm from './journalForm'
import { MdClose } from 'react-icons/md'

export default function CreateTask(): ReactElement {
  const {
    activeModal,
    setActiveModal,
    currentEvent,
    setCurrentEvent,
    currentJournal,
    setCurrentJournal,
  } = useMyContext()

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
      {(activeModal === 'createtask' ||
        activeModal === 'createjournal' ||
        activeModal === 'edittask' ||
        activeModal === 'editjournal') && (
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
          <header className="createtaskheader">
            <button
              className={
                activeModal === 'createtask' || activeModal === 'edittask'
                  ? 'createtasktab-active'
                  : 'createtasktab-inactive'
              }
              style={{
                visibility: activeModal === 'createtask' ? 'visible' : 'hidden',
              }}
              onClick={() => {
                setActiveModal('creattask')
              }}
            >
              Event
            </button>
            <button
              className={
                activeModal === 'createjournal' || activeModal === 'editjournal'
                  ? 'createtasktab-active'
                  : 'createtasktab-inactive'
              }
              style={{
                visibility: activeModal === 'createtask' ? 'visible' : 'hidden',
              }}
              onClick={() => {
                setActiveModal('createjournal')
              }}
            >
              Journal
            </button>
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
          {(activeModal === 'createtask' || activeModal === 'edittask') && (
            <CreateTaskForm />
          )}
          {(activeModal === 'createjournal' ||
            activeModal === 'editjournal') && <CreateJournalForm />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
