"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-forest-green flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Animated Logo */}
            <motion.svg
              width={80}
              height={80}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Shield */}
              <motion.path
                d="M32 4L8 14V30C8 45.464 18.536 58.536 32 62C45.464 58.536 56 45.464 56 30V14L32 4Z"
                fill="#1a3d2e"
                stroke="#c9a227"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              {/* Wheat elements with staggered animation */}
              <motion.path
                d="M32 48V24"
                stroke="#c9a227"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.path
                d="M32 26C28 22 28 18 32 16C36 18 36 22 32 26Z"
                fill="#c9a227"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              />
              <motion.path
                d="M32 32C28 28 28 24 32 22C36 24 36 28 32 32Z"
                fill="#c9a227"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              />
              <motion.path
                d="M32 38C28 34 28 30 32 28C36 30 36 34 32 38Z"
                fill="#c9a227"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              />
              
              {/* Star */}
              <motion.path
                d="M32 10L33.5 13.5L37 14L34.5 16.5L35 20L32 18.5L29 20L29.5 16.5L27 14L30.5 13.5L32 10Z"
                fill="#c9a227"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
              />
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="font-serif text-2xl font-bold text-cream mb-2">
                Vida Asamoah
              </h1>
              <p className="text-cream text-sm" style={{ opacity: 0.6 }}>
                Agrochemicals & Vector Control
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-1 rounded-full mt-8 mx-auto overflow-hidden"
              style={{ backgroundColor: 'rgba(245, 240, 225, 0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
