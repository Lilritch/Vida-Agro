"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-forest-green rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(201, 162, 39, 0.2)' }}>
                  <Cookie className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-cream text-lg mb-1">
                    We Value Your Privacy
                  </h3>
                  <p className="text-cream text-sm" style={{ opacity: 0.7 }}>
                    We use cookies to enhance your browsing experience and analyze site traffic. 
                    By clicking &quot;Accept&quot;, you consent to our use of cookies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={decline}
                  className="flex-1 md:flex-none px-5 py-2.5 text-cream hover:text-cream font-medium transition-colors"
                  style={{ opacity: 0.7 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="flex-1 md:flex-none px-6 py-2.5 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-full transition-colors"
                >
                  Accept
                </button>
              </div>
              
              <button
                onClick={decline}
                className="absolute top-4 right-4 md:hidden text-cream hover:text-cream"
                style={{ opacity: 0.5 }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
