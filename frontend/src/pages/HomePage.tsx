// // src/pages/HomePage.tsx
// import { Link } from "react-router-dom"
// import { CheckSquare, LogIn, UserPlus, Menu, ChevronDown, ShieldCheck, ListChecks, Users, Bell, BarChart3, Sparkles, Quote } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useState, useEffect } from "react"
// import heroImage from "@/assets/newhero.png"
// import Footer from "@/components/layout/Footer"

// /* ---------- Dropdown Component (unchanged) ---------- */
// function NavDropdown({
//   title,
//   links,
//   mobile = false,
// }: {
//   title: string
//   links: { label: string; href: string }[]
//   mobile?: boolean
// }) {
//   const [open, setOpen] = useState(false)

//   return mobile ? (
//     <div>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex w-full items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600"
//       >
//         {title}
//         <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="mt-2 ml-4 space-y-2 border-l border-slate-200 dark:border-slate-700 pl-4">
//           {links.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               className="block text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
//             >
//               {link.label}
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   ) : (
//     <div
//       className="relative"
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
//       >
//         {title}
//         <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
//           {links.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-400"
//             >
//               {link.label}
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// /* ---------- Page Component ---------- */
// export default function HomePage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [displayedText, setDisplayedText] = useState("")
//   const [typingComplete, setTypingComplete] = useState(false)

//   const fullText = "Manage tasks, effortlessly."

//   // Typewriter effect
//   useEffect(() => {
//     let currentIndex = 0
//     const interval = setInterval(() => {
//       if (currentIndex <= fullText.length) {
//         setDisplayedText(fullText.slice(0, currentIndex))
//         currentIndex++
//       } else {
//         clearInterval(interval)
//         setTypingComplete(true)
//       }
//     }, 80)

//     return () => clearInterval(interval)
//   }, [])

//   const featureLinks = [
//     { label: "Task Management", href: "#features-tasks" },
//     { label: "Team Collaboration", href: "#features-collab" },
//     { label: "Integrations", href: "#features-integrations" },
//     { label: "Analytics", href: "#features-analytics" },
//   ]

// const reportLinks = [
//   { label: "Task Reports", href: "#reports-tasks" },
//   { label: "Progress Analytics", href: "#reports-analytics" },
//   { label: "Export & Download", href: "#reports-export" },
// ]
//   const aboutLinks = [
//     { label: "Our Story", href: "#about-story" },
//     { label: "Team", href: "#about-team" },
//     { label: "Careers", href: "#about-careers" },
//     { label: "Contact", href: "#about-contact" },
//   ]

//   return (
//     <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors">
//   {/* Navbar */}
//      {/* Navbar */}
//       <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 shadow">
//               <CheckSquare className="h-5 w-5 text-white" />
//             </div>
//             TaskFlow
//           </Link>

//           {/* Desktop links – smooth scroll to sections */}
//           <div className="hidden items-center gap-8 md:flex">
//             <a
//               href="#features"
//               className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//             >
//               Features
//             </a>
//             <a
//               href="#reports"
//               className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//             >
//               Reports
//             </a>
//             <a
//               href="#about"
//               className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//             >
//               About
//             </a>

//             <div className="flex items-center gap-3">
//               <Link to="/login">
//                 <Button
//                   variant="ghost"
//                   className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
//                 >
//                   Sign In
//                 </Button>
//               </Link>
//               <Link to="/register">
//                 <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:from-indigo-700 hover:to-violet-700">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 md:hidden">
//             <div className="flex flex-col gap-4">
//               <a
//                 href="#features"
//                 className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
//               >
//                 Features
//               </a>
//               <a
//                 href="#reports"
//                 className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
//               >
//                 Reports
//               </a>
//               <a
//                 href="#about"
//                 className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
//               >
//                 About
//               </a>
//               <hr className="border-slate-200 dark:border-slate-700" />
//               <Link
//                 to="/login"
//                 className="text-sm font-medium text-slate-700 dark:text-slate-300"
//               >
//                 Sign In
//               </Link>
//               <Link to="/register">
//                 <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//   <main className="flex-1">
//     {/* ===================== HERO ===================== */}
//     <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 transition-colors">
//       <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <div className="text-center lg:text-left">
//             <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
//               Boost your productivity
//             </span>
//             <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl min-h-[1.2em]">
//               {typingComplete ? (
//                 <>
//                   Manage tasks,{" "}
//                   <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
//                     effortlessly.
//                   </span>
//                 </>
//               ) : (
//                 <span>{displayedText}</span>
//               )}
//               {!typingComplete && <span className="ml-1 animate-pulse text-indigo-500">|</span>}
//             </h1>
//             <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed mx-auto lg:mx-0">
//               Streamline your workflow, collaborate with your team, and never miss a deadline again.
//               TaskFlow gives you the clarity you need to get things done.
//             </p>
//             <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
//               <Link to="/register">
//                 <Button className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:from-indigo-700 hover:to-violet-700 transition-all">
//                   Start for free
//                   <UserPlus className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//               <Link to="/login">
//                 <Button
//                   variant="outline"
//                   className="w-full sm:w-auto rounded-xl border-2 border-indigo-200 dark:border-indigo-800 px-8 py-6 text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50 transition-all"
//                 >
//                   Sign In
//                   <LogIn className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//             </div>

//             {/* Trust row */}
//             <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
//               <div className="flex -space-x-2">
//                 {["A", "B", "C", "D"].map((letter) => (
//                   <div
//                     key={letter}
//                     className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-violet-500 text-xs font-semibold text-white dark:border-slate-950"
//                   >
//                     {letter}
//                   </div>
//                 ))}
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Trusted by <span className="font-semibold text-slate-700 dark:text-slate-200">12,000+</span> teams worldwide
//               </p>
//             </div>
//           </div>

//           <div className="relative flex justify-center lg:justify-end">
//             <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
//               <img
//                 src={heroImage}
//                 alt="TaskFlow dashboard preview"
//                 className="w-full h-auto rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-900/50"
//               />
//               <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full bg-indigo-100 opacity-40 blur-3xl dark:bg-indigo-900/20" />
//               <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-violet-100 opacity-40 blur-3xl dark:bg-violet-900/20" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     {/* ===================== STATS STRIP ===================== */}
//     <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
//       <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
//           {[
//             { value: "12K+", label: "Active teams" },
//             { value: "2.4M", label: "Tasks completed" },
//             { value: "99.9%", label: "Uptime" },
//             { value: "4.9/5", label: "Average rating" },
//           ].map((stat) => (
//             <div key={stat.label} className="text-center">
//               <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
//                 {stat.value}
//               </p>
//               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* ===================== FEATURES ===================== */}
//     <section className="bg-slate-50/60 dark:bg-slate-900/30 py-24">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
//             Why TaskFlow
//           </span>
//           <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
//             Everything you need to stay on top of work
//           </h2>
//           <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
//             No clutter, no complexity — just the tools that help your team ship on time.
//           </p>
//         </div>

//         <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {[
//             {
//               icon: ListChecks,
//               title: "Smart Task Boards",
//               desc: "Organize work into drag-and-drop boards with categories, priorities, and due dates.",
//             },
//             {
//               icon: Users,
//               title: "Team Collaboration",
//               desc: "Assign tasks, leave comments, and keep everyone aligned in real time.",
//             },
//             {
//               icon: Bell,
//               title: "Smart Reminders",
//               desc: "Never miss a deadline with automated notifications and daily digests.",
//             },
//             {
//               icon: BarChart3,
//               title: "Progress Reports",
//               desc: "Track completion rates and team velocity with clean, exportable reports.",
//             },
//             {
//               icon: Sparkles,
//               title: "AI-Assisted Descriptions",
//               desc: "Generate clear task descriptions instantly so nothing gets lost in translation.",
//             },
//             {
//               icon: ShieldCheck,
//               title: "Secure by Design",
//               desc: "Enterprise-grade encryption and role-based access keep your data safe.",
//             },
//           ].map((feature) => (
//             <div
//               key={feature.title}
//               className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md transition-transform group-hover:scale-110">
//                 <feature.icon className="h-6 w-6 text-white" />
//               </div>
//               <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
//                 {feature.title}
//               </h3>
//               <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* ===================== HOW IT WORKS ===================== */}
//     <section className="py-24 bg-white dark:bg-slate-950">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
//             Simple by design
//           </span>
//           <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
//             Get started in three steps
//           </h2>
//         </div>

//         <div className="mt-16 grid gap-10 md:grid-cols-3">
//           {[
//             { step: "01", title: "Create your account", desc: "Sign up in seconds — no credit card required." },
//             { step: "02", title: "Add your tasks", desc: "Organize work into categories and set priorities that matter." },
//             { step: "03", title: "Track your progress", desc: "Watch your completion rate climb with real-time reports." },
//           ].map((item, i) => (
//             <div key={item.step} className="relative text-center md:text-left">
//               <span className="text-6xl font-extrabold text-indigo-100 dark:text-indigo-900/40">
//                 {item.step}
//               </span>
//               <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
//                 {item.title}
//               </h3>
//               <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
//                 {item.desc}
//               </p>
//               {i < 2 && (
//                 <div className="absolute top-8 left-full hidden w-10 -translate-x-4 border-t-2 border-dashed border-indigo-200 dark:border-indigo-900 md:block" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* ===================== TESTIMONIAL ===================== */}
//     <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-20">
//       <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
//         <Quote className="mx-auto h-10 w-10 text-white/40" />
//         <p className="mt-6 text-2xl font-medium leading-relaxed text-white sm:text-3xl">
//           TaskFlow completely changed how our team plans sprints. We went from scattered spreadsheets to a single source of truth in a week.
//         </p>
//         <div className="mt-8 flex items-center justify-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
//             SR
//           </div>
//           <div className="text-left">
//             <p className="text-sm font-semibold text-white">Sara Reyes</p>
//             <p className="text-xs text-indigo-100">Head of Product, Northwind</p>
//           </div>
//         </div>
//       </div>
//     </section>

//     {/* ===================== FINAL CTA ===================== */}
//     <section className="bg-white dark:bg-slate-950 py-24">
//       <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950 border border-indigo-100 dark:border-indigo-900/40 px-8 py-16 text-center shadow-xl sm:px-16">
//         <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
//           Ready to get more done?
//         </h2>
//         <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
//           Join thousands of teams already managing their work with TaskFlow — free to start, no credit card needed.
//         </p>
//         <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
//           <Link to="/register">
//             <Button className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:from-indigo-700 hover:to-violet-700 transition-all">
//               Start for free
//               <UserPlus className="ml-2 h-5 w-5" />
//             </Button>
//           </Link>
//           <Link to="/login">
//             <Button
//               variant="outline"
//               className="w-full sm:w-auto rounded-xl border-2 border-indigo-200 dark:border-indigo-800 px-8 py-6 text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50 transition-all"
//             >
//               Sign In
//               <LogIn className="ml-2 h-5 w-5" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   </main>

//   <Footer />
// </div>
//   )
// }

// src/pages/HomePage.tsx
import { Link } from "react-router-dom"
import {
  CheckSquare,
  LogIn,
  UserPlus,
  Menu,
  BarChart3,
  Bell,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Users,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import heroImage from "@/assets/newhero.png"
import Footer from "@/components/layout/Footer"

/* ---------- Home Page Component ---------- */
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

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 shadow">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            TaskFlow
          </Link>

          {/* Desktop links – smooth scroll to sections */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#reports"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Reports
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About
            </a>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
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
              <a
                href="#features"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
              >
                Features
              </a>
              <a
                href="#reports"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
              >
                Reports
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
              >
                About
              </a>
              <hr className="border-slate-200 dark:border-slate-700" />
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
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

      <main className="flex-1">
        {/* ===================== HERO ===================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 transition-colors">
          {/* same hero content as before */}
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2">
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
                  {!typingComplete && <span className="ml-1 animate-pulse text-indigo-500">|</span>}
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

                {/* Trust row */}
                <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
                  <div className="flex -space-x-2">
                    {["A", "B", "C", "D"].map((letter) => (
                      <div
                        key={letter}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-violet-500 text-xs font-semibold text-white dark:border-slate-950"
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Trusted by <span className="font-semibold text-slate-700 dark:text-slate-200">12,000+</span> teams worldwide
                  </p>
                </div>
              </div>

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

        {/* ===================== STATS STRIP ===================== */}
        <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "12K+", label: "Active teams" },
                { value: "2.4M", label: "Tasks completed" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9/5", label: "Average rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FEATURES (id="features") ===================== */}
        <section id="features" className="bg-slate-50/60 dark:bg-slate-900/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Why TaskFlow
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Everything you need to stay on top of work
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                No clutter, no complexity — just the tools that help your team ship on time.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ListChecks,
                  title: "Smart Task Boards",
                  desc: "Organize work into drag-and-drop boards with categories, priorities, and due dates.",
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  desc: "Assign tasks, leave comments, and keep everyone aligned in real time.",
                },
                {
                  icon: Bell,
                  title: "Smart Reminders",
                  desc: "Never miss a deadline with automated notifications and daily digests.",
                },
                {
                  icon: BarChart3,
                  title: "Progress Reports",
                  desc: "Track completion rates and team velocity with clean, exportable reports.",
                },
                {
                  icon: Sparkles,
                  title: "AI-Assisted Descriptions",
                  desc: "Generate clear task descriptions instantly so nothing gets lost in translation.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure by Design",
                  desc: "Enterprise-grade encryption and role-based access keep your data safe.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== REPORTS SECTION (id="reports") ===================== */}
        <section id="reports" className="py-24 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Actionable Insights
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Reports that drive decisions
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Visualise your team's progress with beautiful, exportable reports that keep everyone on the same page.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-indigo-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Task Completion</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Track how many tasks are completed each week and identify bottlenecks.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                <ListChecks className="mx-auto h-10 w-10 text-indigo-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Workload Distribution</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Balance tasks across your team with clear workload visualisations.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                <Users className="mx-auto h-10 w-10 text-indigo-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Team Performance</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Compare individual and team velocity over time with detailed analytics.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link to="/register">
                <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  Start seeing reports
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== HOW IT WORKS ===================== */}
        <section className="py-24 bg-slate-50/60 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Simple by design
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Get started in three steps
              </h2>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {[
                { step: "01", title: "Create your account", desc: "Sign up in seconds — no credit card required." },
                { step: "02", title: "Add your tasks", desc: "Organize work into categories and set priorities that matter." },
                { step: "03", title: "Track your progress", desc: "Watch your completion rate climb with real-time reports." },
              ].map((item, i) => (
                <div key={item.step} className="relative text-center md:text-left">
                  <span className="text-6xl font-extrabold text-indigo-100 dark:text-indigo-900/40">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                  {i < 2 && (
                    <div className="absolute top-8 left-full hidden w-10 -translate-x-4 border-t-2 border-dashed border-indigo-200 dark:border-indigo-900 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIAL ===================== */}
        <section id="join" className="bg-gradient-to-br from-indigo-600 to-violet-600 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Quote className="mx-auto h-10 w-10 text-white/40" />
            <p className="mt-6 text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              TaskFlow completely changed how our team plans sprints. We went from scattered spreadsheets to a single source of truth in a week.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
                SR
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Sara Reyes</p>
                <p className="text-xs text-indigo-100">Head of Product, Northwind</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION (id="about") ===================== */}
        <section id="about" className="py-24 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                  Our story
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Built by remote teams, for remote teams
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                  TaskFlow started as a simple to‑do list and grew into the productivity platform that thousands of teams rely on every day.
                  We're on a mission to make work feel lighter, clearer, and more human.
                </p>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                  Our global team works remotely across 12 countries, bringing diverse perspectives to every feature we ship.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link to="/register">
                    <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                      Join our team
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="rounded-xl border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                      Contact us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-8 shadow-xl">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold">Our Values</h3>
                    <ul className="mt-6 space-y-4 text-left">
                      <li className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5" /> Simplicity over complexity
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5" /> Async collaboration
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5" /> Continuous improvement
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5" /> Inclusive by design
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="bg-slate-50/60 dark:bg-slate-900/30 pt-12 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-white via-indigo-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950 border border-indigo-100 dark:border-indigo-900/40 px-8 py-12 text-center shadow-lg sm:px-16 sm:py-14">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Ready to get more done?
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
                Join thousands of teams already managing their work with TaskFlow — free to start, no credit card needed.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}