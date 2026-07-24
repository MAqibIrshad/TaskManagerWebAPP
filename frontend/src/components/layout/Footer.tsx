// src/components/Footer.tsx
import { Link } from "react-router-dom"
import { CheckSquare } from "lucide-react"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#about-contact" },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo + tagline */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 shadow">
              <CheckSquare className="h-3.5 w-3.5 text-white" />
            </div>
            <span>© {new Date().getFullYear()} TaskFlow. All rights reserved.</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}