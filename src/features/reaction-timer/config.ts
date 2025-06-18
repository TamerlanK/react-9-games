export type Status = "waiting" | "ready" | "go" | "tooSoon"

export const REACTION_TIMER_DELAY = {
  MIN: 2000,
  MAX: 4000,
}

export const MAX_RECORDS = 5

type MessageGroup = {
  threshold: number
  messages: string[]
}

export const messageGroups: MessageGroup[] = [
  {
    threshold: 1000,
    messages: [
      "Bro, did you crash?",
      "Glacier vibes, fr.",
      "This ain't a slow-mo.",
      "You good back there?",
      "Loading... still loading.",
    ],
  },
  {
    threshold: 800,
    messages: [
      "Lowkey kinda slow.",
      `Wake up, it's ${new Date().getFullYear()}.`,
      "Try again, fam.",
      "Bruh, is your WiFi down?",
      "Snail speed flex.",
    ],
  },
  {
    threshold: 500,
    messages: [
      "Average Joe vibes.",
      "Not bad, could hustle.",
      "Getting there, kinda.",
      "Mid-tier, no cap.",
      "Keep grinding, champ.",
    ],
  },
  {
    threshold: 300,
    messages: [
      "Okay, that’s quickish.",
      "Looking kinda sus fast.",
      "Almost flex-worthy.",
      "You’re not that slow.",
      "Decent, but step up.",
    ],
  },
  {
    threshold: 200,
    messages: [
      "Speed demon alert!",
      "Yo, chill on the speed.",
      "Future esports star?",
      "Blink and it’s gone.",
      "Flexing on us all.",
    ],
  },
  {
    threshold: 0,
    messages: [
      "AI or what?",
      "Bro, cheat codes?",
      "Are you even human?",
      "Teach us your ways.",
      "Hackerman vibes, legit.",
    ],
  },
]
