import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const animationVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const PageTransitionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full"
    >
      {children}
    </motion.div>
  )
}

export default PageTransitionWrapper
