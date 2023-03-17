import { ReactElement, useState } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'

export default function CreateTask(): ReactElement {
  const { activeModal, setActiveModal } = useMyContext()
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
            duration: 0.2,
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
              Create Event
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
              Create Journal Entry
            </button>
          </header>

          <div className="createtask-content">
            {' '}
            <button
              onClick={() => {
                setActiveModal(false)
              }}
            >
              Off
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
