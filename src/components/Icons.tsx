import React from "react"

export const OIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <circle cx={16} cy={16} r={10} stroke="white" strokeWidth={4} />
  </svg>
)

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <line
      x1={8}
      y1={8}
      x2={24}
      y2={24}
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <line
      x1={24}
      y1={8}
      x2={8}
      y2={24}
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
    />
  </svg>
)
