"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// Pages
import Home from "./pages/Home"
import Services from "./pages/Services"
import About from "./pages/About"
import Clients from "./pages/Clients"
import JobApply from "./pages/JobApply"
import Contact from "./pages/Contact"

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Chatbot from "./components/Chatbot"

// Context
import { LanguageProvider } from "./context/LanguageContext"

// ScrollToTop component to ensure pages start from top
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/job-apply" element={<JobApply />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
