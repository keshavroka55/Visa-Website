"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"

interface ChatbotProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface Message {
  text: string
  isBot: boolean
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you with your visa queries today?", isBot: true },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    setMessages([...messages, { text: input, isBot: false }])

    // Process the query
    setTimeout(() => {
      let response: string
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("malaysia visa") || lowercaseInput.includes("apply for malaysia")) {
        response =
          "To apply for a Malaysia visa, you'll need to complete our application form, provide your passport, CV, and any relevant certificates. Our team will guide you through the entire process."
      } else if (lowercaseInput.includes("document") || lowercaseInput.includes("required")) {
        response =
          "The required documents typically include: valid passport, completed application form, recent photos, CV, educational certificates, and any job-specific qualifications. Requirements may vary by country."
      } else if (lowercaseInput.includes("processing time") || lowercaseInput.includes("how long")) {
        response =
          "Processing time varies by country. For Malaysia, it typically takes 2-4 weeks. Other countries may take anywhere from 1-6 weeks. We'll provide specific timelines during your application process."
      } else if (
        lowercaseInput.includes("cost") ||
        lowercaseInput.includes("fee") ||
        lowercaseInput.includes("price")
      ) {
        response =
          "Visa fees vary by country and visa type. Please visit our services page for detailed pricing or contact our team directly for a personalized quote."
      } else {
        response =
          "Thank you for your question. For specific details, please visit our services page or contact us directly. Would you like information about a particular country or service?"
      }

      setMessages((prev) => [...prev, { text: response, isBot: true }])
    }, 1000)

    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Chatbot button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
            style={{ maxHeight: "calc(100vh - 150px)" }}
          >
            {/* Header */}
            <div className="bg-blue-700 text-white p-4">
              <h3 className="font-bold text-lg">Visa Assistant</h3>
              <p className="text-sm text-blue-100">Ask me about visa processes</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`mb-3 ${message.isBot ? "flex flex-row" : "flex flex-row-reverse"}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white mr-2 flex-shrink-0">
                      V
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[75%] ${
                      message.isBot ? "bg-white text-gray-800 shadow-sm" : "bg-blue-700 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-700 text-white p-2 rounded-r-md hover:bg-blue-800 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
