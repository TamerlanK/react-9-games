import { AnimatePresence } from "framer-motion"
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom"

import CatchTheDotGamePage from "@/features/catch-the-dot"
import HomePage from "@/features/home"
import MemoryCardPage from "@/features/memory-card"
import NumberGuessingPage from "@/features/number-guessing"
import ReactionTimerPage from "@/features/reaction-timer"
import RockPaperScissorsPage from "@/features/rock-paper-scissors"
import SequenceMemoryPage from "@/features/sequence-memory"
import TicTacToePage from "@/features/tic-tac-toe"
import TypingSpeedPage from "@/features/typing-speed"
import WhackAMolePage from "@/features/whack-a-mole"
import GameLayout from "@/layouts/GameLayout"
import PageTransitionWrapper from "@/layouts/PageTransitionWrapper"
import { ROUTES } from "./config/constants"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path={ROUTES.HOME}
            element={
              <PageTransitionWrapper>
                <HomePage />
              </PageTransitionWrapper>
            }
          />
          <Route element={<GameLayout />}>
            <Route path={ROUTES.TIC_TAC_TOE} element={<TicTacToePage />} />
            <Route
              path={ROUTES.ROCK_PAPER_SCISSORS}
              element={<RockPaperScissorsPage />}
            />
            <Route path={ROUTES.MEMORY_CARD} element={<MemoryCardPage />} />
            <Route path={ROUTES.WHACK_A_MOLE} element={<WhackAMolePage />} />
            <Route
              path={ROUTES.NUMBER_GUESSING}
              element={<NumberGuessingPage />}
            />
            <Route
              path={ROUTES.REACTION_TIMER}
              element={<ReactionTimerPage />}
            />
            <Route
              path={ROUTES.CATCH_THE_DOT}
              element={<CatchTheDotGamePage />}
            />
            <Route
              path={ROUTES.SEQUENCE_MEMORY}
              element={<SequenceMemoryPage />}
            />
            <Route path={ROUTES.TYPING_SPEED} element={<TypingSpeedPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  )
}

const App = () => (
  <Router>
    <AnimatedRoutes />
  </Router>
)

export default App
