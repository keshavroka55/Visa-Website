"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

// Define admin user type
interface AdminUser {
  id: string
  username: string
  role: string
}

// Define context type
type AuthContextType = {
  isAuthenticated: boolean
  admin: AdminUser | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  admin: null,
  login: async () => false,
  logout: () => {},
  loading: true,
})

// Mock admin credentials (in a real app, this would be handled by a backend)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "visacenter2024",
  user: {
    id: "1",
    username: "admin",
    role: "administrator",
  },
}

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedAuth = localStorage.getItem("admin_auth")
      const storedAdmin = localStorage.getItem("admin_user")

      if (storedAuth === "true" && storedAdmin) {
        try {
          const adminData = JSON.parse(storedAdmin)
          setIsAuthenticated(true)
          setAdmin(adminData)
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem("admin_auth")
          localStorage.removeItem("admin_user")
        }
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      setAdmin(ADMIN_CREDENTIALS.user)

      // Store auth state
      localStorage.setItem("admin_auth", "true")
      localStorage.setItem("admin_user", JSON.stringify(ADMIN_CREDENTIALS.user))

      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    setIsAuthenticated(false)
    setAdmin(null)
    localStorage.removeItem("admin_auth")
    localStorage.removeItem("admin_user")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout, loading }}>{children}</AuthContext.Provider>
  )
}

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext)
