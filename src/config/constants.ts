import type { TGame } from "./types"

import {
  FaBrain,
  FaCalculator,
  FaHammer,
  FaHandRock,
  FaKeyboard,
  FaMousePointer,
  FaRegClone,
  FaStopwatch,
} from "react-icons/fa"
import { MdGrid3X3 } from "react-icons/md"

export const ROUTES = {
  HOME: "/",
  TIC_TAC_TOE: "/tic-tac-toe",
  ROCK_PAPER_SCISSORS: "/rock-paper-scissors",
  MEMORY_CARD: "/memory-card",
  WHACK_A_MOLE: "/whack-a-mole",
  NUMBER_GUESSING: "/number-guessing",
  REACTION_TIMER: "/reaction-timer",
  CLICK_COUNT: "/click-count",
  SEQUENCE_MEMORY: "/sequence-memory",
  TYPING_SPEED: "/typing-speed",
} as const

export const games: TGame[] = [
  { title: "Tic Tac Toe", route: ROUTES.TIC_TAC_TOE, icon: MdGrid3X3 },
  {
    title: "Rock Paper Scissors",
    route: ROUTES.ROCK_PAPER_SCISSORS,
    icon: FaHandRock,
  },
  { title: "Memory Card Game", route: ROUTES.MEMORY_CARD, icon: FaRegClone },
  { title: "Whack a Mole", route: ROUTES.WHACK_A_MOLE, icon: FaHammer },
  {
    title: "Number Guessing",
    route: ROUTES.NUMBER_GUESSING,
    icon: FaCalculator,
  },
  { title: "Reaction Timer", route: ROUTES.REACTION_TIMER, icon: FaStopwatch },
  {
    title: "Most Click Count",
    route: ROUTES.CLICK_COUNT,
    icon: FaMousePointer,
  },
  { title: "Sequence Memory", route: ROUTES.SEQUENCE_MEMORY, icon: FaBrain },
  { title: "Typing Speed", route: ROUTES.TYPING_SPEED, icon: FaKeyboard },
]
