// src/pages/HomePage.tsx
import { Link } from "react-router-dom"
import { CheckSquare, LogIn, UserPlus, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import heroImage from "@/assets/herosection.png"
import Footer from "@/components/layout/Footer"

/* ---------- Dropdown Component (unchanged) ---------- */
function NavDropdown({
  title,
  links,
  mobile = false,
}: {
  title: string
  links: { label: string; href: string }[]
  mobile?: boolean
}) {
  const [open, setOpen] = useState(false)

  return mobile ? (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
      >
        {title}
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 ml-4 space-y-2 border-l border-slate-200 dark:border-slate-700 pl-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Page Component ---------- */
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)

  const fullText = "Manage tasks, effortlessly."

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setTypingComplete(true)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const featureLinks = [
    { label: "Task Management", href: "#features-tasks" },
    { label: "Team Collaboration", href: "#features-collab" },
    { label: "Integrations", href: "#features-integrations" },
    { label: "Analytics", href: "#features-analytics" },
  ]

  const pricingLinks = [
    { label: "Free Plan", href: "#pricing-free" },
    { label: "Pro Plan", href: "#pricing-pro" },
    { label: "Enterprise", href: "#pricing-enterprise" },
  ]

  const aboutLinks = [
    { label: "Our Story", href: "#about-story" },
    { label: "Team", href: "#about-team" },
    { label: "Careers", href: "#about-careers" },
    { label: "Contact", href: "#about-contact" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 shadow">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            TaskFlow
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <NavDropdown title="Features" links={featureLinks} />
            <NavDropdown title="Pricing" links={pricingLinks} />
            <NavDropdown title="About" links={aboutLinks} />

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:from-indigo-700 hover:to-violet-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <NavDropdown title="Features" links={featureLinks} mobile />
              <NavDropdown title="Pricing" links={pricingLinks} mobile />
              <NavDropdown title="About" links={aboutLinks} mobile />
              <hr className="border-slate-200 dark:border-slate-700" />
              <Link to="/login" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Sign In
              </Link>
              <Link to="/register">
                <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 transition-colors">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left column - text */}
              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                  Boost your productivity
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl min-h-[1.2em]">
                  {typingComplete ? (
                    <>
                      Manage tasks,{" "}
                      <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        effortlessly.
                      </span>
                    </>
                  ) : (
                    <span>{displayedText}</span>
                  )}
                  {/* Blinking cursor */}
                  {!typingComplete && (
                    <span className="ml-1 animate-pulse text-indigo-500">|</span>
                  )}
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed mx-auto lg:mx-0">
                  Streamline your workflow, collaborate with your team, and never miss a deadline again.
                  TaskFlow gives you the clarity you need to get things done.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link to="/register">
                    <Button className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:from-indigo-700 hover:to-violet-700 transition-all">
                      Start for free
                      <UserPlus className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-xl border-2 border-indigo-200 dark:border-indigo-800 px-8 py-6 text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50 transition-all"
                    >
                      Sign In
                      <LogIn className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right column - larger image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  <img
                    src={heroImage}
                    alt="TaskFlow dashboard preview"
                    className="w-full h-auto rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-900/50"
                  />
                  <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full bg-indigo-100 opacity-40 blur-3xl dark:bg-indigo-900/20" />
                  <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-violet-100 opacity-40 blur-3xl dark:bg-violet-900/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}