import { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMyContext } from '@/utils/provider'

export default function Loading(): ReactElement {
  const { loading, initialLoad } = useMyContext()

  return (
    <AnimatePresence mode="wait" initial={initialLoad}>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
          transition={{
            type: 'linear',
            duration: 0.2,
          }}
          className="loadingcont-light"
        >
          loading
        </motion.div>
      )}
    </AnimatePresence>
  )
}
