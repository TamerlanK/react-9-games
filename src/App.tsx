import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import HomePage from "@/features/home"
import MemoryCardPage from "@/features/memory-card"
import RockPaperScissorsPage from "@/features/rock-paper-scissors"
import TicTacToePage from "@/features/tic-tac-toe"
import WhackAMolePage from "@/features/whack-a-mole"
import NumberGuessingPage from "@/features/number-guessing"
import ReactionTimerPage from "@/features/reaction-timer"
import ClickCountPage from "@/features/click-count"
import SequenceMemoryPage from "@/features/sequence-memory"
import TypingSpeedPage from "@/features/typing-speed"
import GameLayout from "@/layouts/GameLayout"
import PageTransitionWrapper from "@/layouts/PageTransitionWrapper"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransitionWrapper>
                <HomePage />
              </PageTransitionWrapper>
            }
          />
          <Route element={<GameLayout />}>
            <Route path="/tic-tac-toe" element={<TicTacToePage />} />
            <Route
              path="/rock-paper-scissors"
              element={<RockPaperScissorsPage />}
            />
            <Route path="/memory-card" element={<MemoryCardPage />} />
            <Route path="/whack-a-mole" element={<WhackAMolePage />} />
            <Route path="/number-guessing" element={<NumberGuessingPage />} />
            <Route path="/reaction-timer" element={<ReactionTimerPage />} />
            <Route path="/click-count" element={<ClickCountPage />} />
            <Route path="/sequence-memory" element={<SequenceMemoryPage />} />
            <Route path="/typing-speed" element={<TypingSpeedPage />} />
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
