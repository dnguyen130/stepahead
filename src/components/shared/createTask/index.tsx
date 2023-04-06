import { ReactElement, useState } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import CreateTaskForm from './todoForm'
import CreateJournalForm from './journalForm'
import { MdClose } from 'react-icons/md'

export default function CreateTask(): ReactElement {
  const { activeModal, setActiveModal, currentEvent, setCurrentEvent } =
    useMyContext()
  const [activeTab, setActiveTab] = useState('event')

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

  return (
    <AnimatePresence mode="wait">
      {activeModal === 'createtask' && (
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
                activeTab === 'event'
                  ? 'createtasktab-active'
                  : 'createtasktab-inactive'
              }
              onClick={() => {
                setActiveTab('event')
              }}
            >
              Event
            </button>
            <button
              className={
                activeTab === 'journal'
                  ? 'createtasktab-active'
                  : 'createtasktab-inactive'
              }
              onClick={() => {
                setActiveTab('journal')
              }}
            >
              Journal
            </button>
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
          {activeTab === 'event' && <CreateTaskForm />}
          {activeTab === 'journal' && <CreateJournalForm />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
