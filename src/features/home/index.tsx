import { games } from "@/config/constants"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

const HomePage = () => {
  const [selectedGame, setSelectedGame] = useState<null | (typeof games)[0]>(
    null
  )
  const navigate = useNavigate()

  const handleClick = (game: (typeof games)[0]) => {
    setSelectedGame(game)

    setTimeout(() => {
      navigate(game.route)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-7 max-w-3xl">
        {games.map((game) => (
          <motion.div
            layoutId={game.route}
            key={game.route}
            className="group aspect-square bg-neutral-800 rounded-md flex items-center justify-center text-balance relative hover:bg-neutral-700/50 active:scale-95 transition-all cursor-pointer"
            onClick={() => handleClick(game)}
          >
            <div className="absolute aspect-square -top-5 bg-white rounded-full w-1/3 grid place-content-center">
              <game.icon className="text-neutral-700 shrink-0 group-hover:-translate-y-1 group-hover:scale-125 transform transition-transform" />
            </div>
            <span className="text-center text-white text-sm text-balance px-6 font-semibold">
              {game.title}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            layoutId={selectedGame.route}
            className="fixed top-0 left-0 w-full h-full bg-neutral-800 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white text-center space-y-4">
              <selectedGame.icon className="text-5xl mx-auto" />
              <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
              <p className="text-sm text-neutral-300">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
