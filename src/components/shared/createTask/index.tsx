import { ReactElement, useState } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import CreateTaskForm from './form'
import { MdClose } from 'react-icons/md'

export default function CreateTask(): ReactElement {
  const { activeModal } = useMyContext()
  const [activeTab, setActiveTab] = useState('event')

  return (
    <AnimatePresence mode="wait">
      {activeModal && (
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
              Journal Entry
            </button>
            <button className="exitbutton">
              <MdClose size="100%" />
            </button>
          </header>
          <div className="createtask-content">
            <CreateTaskForm />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
