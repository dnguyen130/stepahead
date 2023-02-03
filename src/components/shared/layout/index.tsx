import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type NavbarProps = {
  children: ReactNode
}
//component to handle page transitions
export default function Layout(fn: NavbarProps) {
  return (
    <motion.div
      className="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'linear',
        duration: 0.5,
      }}
    >
      {fn.children}
    </motion.div>
  )
}
