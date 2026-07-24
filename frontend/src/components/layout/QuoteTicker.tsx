// src/components/QuoteTicker.tsx
import { useEffect, useState } from "react"

const quotes = [
  "Stay focused, stay productive.",
  "Small steps every day lead to big results.",
  "Your only limit is you.",
  "Turn your to-dos into ta-das!",
  "Plan your work and work your plan.",
]

export default function QuoteTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-6 w-full max-w-md overflow-hidden">
      {quotes.map((quote, i) => (
        <p
          key={i}
          className={`absolute inset-x-0 text-center text-md text-slate-500 dark:text-slate-400 whitespace-nowrap transition-all duration-500 ease-in-out ${
            i === index
              ? "translate-y-0 opacity-100"
              : i < index
              ? "-translate-y-6 opacity-0"
              : "translate-y-6 opacity-0"
          }`}
        >
          {quote}
        </p>
      ))}
    </div>
  )
}