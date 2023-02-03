import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type NavbarProps = {
  children: ReactNode
}

export default function Layout(fn: NavbarProps) {
  return (
    <motion.div
      className="layout"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {fn.children}
    </motion.div>
  )
}
