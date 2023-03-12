import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'

export default function CreateTask(): ReactElement {
  const { activeModal, setActiveModal } = useMyContext()

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
          Hello
          <button
            onClick={() => {
              setActiveModal(false)
            }}
          >
            Off
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
