"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { MenuIcon, XIcon } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.clients"), path: "/clients" },
    { name: t("nav.jobs"), path: "/job-apply" },
    { name: t("nav.contact"), path: "/contact" },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-md py-2 md:py-3 sticky top-0 z-50 w-full">
      <div className="container-custom viewport-contained">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://imgs.search.brave.com/jQvnYGogmyGkg9yChLLuRSMv3wSorevpTuLxYAz9a_o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vZzdNd0M4/VXcyOG81V2d3YV9R/WVljdEwxME12dldJ/X0Vpb3pvV3FzX3I1/VS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldGbi9aWE11YzJW/bGEyeHZaMjh1L1ky/OXRMMnh2WjI4dGNH/NW4vTHpFMEx6SXZk/bWx6WVMxcy9iMmR2/TFhCdVoxOXpaV1Zy/L2JHOW5ieTB4TkRr/Mk9UUXUvY0c1bg" alt="Visa Center Logo" className="h-7 w-7" />
            <span className="text-base md:text-lg font-bold text-blue-700">VisaCenter</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 lg:space-x-5 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path) ? "text-blue-700 font-medium" : "text-gray-600 hover:text-blue-700"
                } transition-colors text-xs lg:text-sm`}
              >
                {link.name}
              </Link>
            ))}
            <div className="ml-1">
              <LanguageSwitcher />
            </div>
            {/* Admin Access Link */}
            <Link
              to="/admin/login"
              className="text-xs text-gray-700 hover:text-blue-600 transition-colors ml-2"
              title="Admin Access"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-700 focus:outline-none">
              {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3"
          >
            <div className="flex flex-col space-y-3 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive(link.path) ? "text-blue-700 font-medium" : "text-gray-600 hover:text-blue-700"
                  } transition-colors px-2 py-1 rounded-md text-sm`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
