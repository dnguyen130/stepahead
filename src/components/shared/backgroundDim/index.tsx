import { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMyContext } from '@/utils/provider'

export default function BackgroundDim(): ReactElement {
  const { activeModal, setActiveModal } = useMyContext()
  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'linear', duration: 0 }}
          className="backgrounddim"
          onClick={() => {
            setActiveModal(false)
          }}
        />
      )}
    </AnimatePresence>
  )
}
