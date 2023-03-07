import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { useMyContext } from '@/utils/provider'

export default function Loading(): ReactElement {
  const { loading } = useMyContext()

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0, transitionEnd: { display: 'none' } }}
      transition={{
        type: 'linear',
        duration: 0.2,
      }}
      className="loadingcont-light"
    >
      loading
    </motion.div>
  )
}
