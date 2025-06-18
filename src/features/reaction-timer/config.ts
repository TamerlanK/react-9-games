export type Status = "waiting" | "ready" | "go" | "tooSoon"

export const REACTION_TIMER_DELAY = {
  MIN: 1500,
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
      "Still loading, huh? 💤",
      "Bro, you okay? 🫠",
      "That was painful. 🐢",
      "Lag from 1999? 📼",
      "Reaction? Eventually, maybe. 🕰️",
      "Taking your sweet time. 🍯",
      "Did you fall asleep? 😴",
      "You clicked… eventually. 🐌",
      "Retirement speed unlocked. 👵",
      "Grandma’s laughing hard. 😂👵",
    ],
  },
  {
    threshold: 800,
    messages: [
      "You blinked twice. 👀",
      "Faster than yesterday! ⏩",
      "Slower than dial-up. 📞💻",
      "Almost there… kinda. 🫣",
      "Gamer warmup, right? 🕹️",
      "You alive in there? 👻",
      "Okayish, but barely. 😐",
      "Speed needs therapy. 🛋️",
      "Click harder, maybe? 👆💥",
      "More coffee, less nap. ☕😵",
    ],
  },
  {
    threshold: 500,
    messages: [
      "Solid mid, keep pushing. 💪",
      "You got potential. 🌱",
      "Warming up nicely. 🔥",
      "Could be greatness. 👀",
      "Not bad, not great. 😶",
      "Progress is progress. 📈",
      "Average, but ambitious. 😎",
      "Try hard mode soon? 🎮",
      "You’re almost cooking. 🍳",
      "Steady climb, I see. 🧗‍♂️",
    ],
  },
  {
    threshold: 300,
    messages: [
      "Okay, you gaming? 🎯",
      "Pretty decent click. 👍",
      "Wrist warmed up. 🖐️🔥",
      "Good stuff, gamer. 🫡",
      "That’s speed, kinda. ⚡",
      "We’re getting spicy. 🌶️",
      "Quick with it. 🚀",
      "Above average legend. 🏅",
      "Almost cracked, ngl. 🧠💥",
      "Real potential detected. 🔍",
    ],
  },
  {
    threshold: 200,
    messages: [
      "Certified fast click. ✅⚡",
      "Top-tier gamer mode. 🏆🎮",
      "Speedy hands fr. 👐💨",
      "Flex-worthy timing. 💪⌛",
      "You’re cracked, bro. 🧠💣",
      "Reaction GOAT vibes. 🐐",
      "youshowspeed? 🔥",
      "Built different, confirmed. 🧬",
      "Turbo fingers go brr. 🌀",
      "Peak reflex energy. 💯⚡",
    ],
  },
  {
    threshold: 0,
    messages: [
      "Not human confirmed. 🤖",
      "Speedrun god tier. 🕹️👑",
      "Esports scout watching. 👀🎯",
      "Cheat code reflexes. 🧠🛸",
      "Frame-perfect click. 🎞️✨",
      "World record pace. 🏁⏱️",
      "Fastest click alive. ⚡💥",
      "Who hurt your mouse? 🐭💔",
      "Glitched the matrix. 🧪🧱",
      "Teach me sensei. 🧘‍♂️🖱️",
    ],
  },
]
