import { games, ROUTES } from "@/config/constants"
import PageTransitionWrapper from "@/layouts/PageTransitionWrapper"
import { type Variants, motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa6"
import { Link, Outlet, useLocation } from "react-router-dom"

const backButtonVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

const titleVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const GameLayout = () => {
  const location = useLocation()
  const currentGame = games.find((g) => g.route === location.pathname)

  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center relative overflow-hidden">
      <div className="fixed top-7 left-0 w-full flex items-center justify-between px-10 z-50">
        <motion.div
          variants={backButtonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Link
            to={ROUTES.HOME}
            className="size-12 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-neutral-100 transition-colors"
          >
            <FaArrowLeft className="size-5 text-neutral-800" />
          </Link>
        </motion.div>

        {currentGame && (
          <motion.h1
            className="absolute left-1/2 transform -translate-x-1/2 text-white text-4xl font-semibold"
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentGame.title}
          </motion.h1>
        )}
      </div>

      <PageTransitionWrapper>
        <div className="flex items-center justify-center w-full h-full">
          <Outlet />
        </div>
      </PageTransitionWrapper>
    </div>
  )
}

export default GameLayout
