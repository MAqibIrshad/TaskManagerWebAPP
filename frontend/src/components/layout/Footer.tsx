// src/components/layout/Footer.tsx
import { Link } from "react-router-dom"
import { CheckSquare } from "lucide-react"

type FooterLink = {
  label: string
  href: string
}

const defaultLinks: FooterLink[] = [
  { label: "Features", href: "#features" },
  { label: "Reports", href: "#reports" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#join" },
]

type FooterProps = {
  links?: FooterLink[]
}

export default function Footer({ links = defaultLinks }: FooterProps) {
  return (
    <footer className="border-t border-indigo-100/80 bg-white/80 backdrop-blur-xl dark:border-indigo-900/40 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 shadow shadow-indigo-200/50 dark:shadow-indigo-900/40">
              <CheckSquare className="h-3.5 w-3.5 text-white" />
            </div>
            <span>
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  )
}
