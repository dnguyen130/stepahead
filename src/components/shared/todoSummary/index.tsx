import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'

export default function TodoSummary(): ReactElement {
  const { activeModal, setActiveModal } = useMyContext()

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
              }}
            >
              <MdClose size="100%" />
            </button>
          </header>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
