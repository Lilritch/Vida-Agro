"use client"

import { motion } from "framer-motion"

export function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/233245407874?text=Hello%20Vida%20Asamoah%20Agrochemicals%2C%20I%20would%20like%20to%20enquire%20about..."

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        delay: 2,
        scale: { type: "spring", stiffness: 200 },
        opacity: { duration: 0.45 },
        y: { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_0_34px_rgba(37,211,102,0.7)] md:h-16 md:w-16"
      style={{
        boxShadow:
          "0 18px 40px rgba(9, 30, 18, 0.22), 0 0 0 1px rgba(255,255,255,0.14), 0 0 28px rgba(37, 211, 102, 0.42)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-35 blur-md" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#25D366]/35 blur-xl" />

      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="relative z-10 h-8 w-8 drop-shadow-[0_3px_10px_rgba(255,255,255,0.28)] md:h-9 md:w-9"
        fill="none"
      >
        <path
          fill="#fff"
          d="M32.04 12c-10.82 0-19.57 8.7-19.57 19.45 0 3.44.91 6.8 2.63 9.75L12 52l11.02-2.88a19.72 19.72 0 0 0 9.02 2.18c10.8 0 19.56-8.7 19.56-19.43C51.6 20.7 42.84 12 32.04 12Zm0 35.58c-2.87 0-5.69-.77-8.16-2.24l-.58-.35-6.54 1.71 1.75-6.36-.38-.64a15.56 15.56 0 0 1-2.42-8.24c0-8.61 7.03-15.61 15.68-15.61 8.65 0 15.63 6.99 15.63 15.61 0 8.6-7 15.62-15.63 15.62Z"
        />
        <path
          fill="#fff"
          d="M41.23 36.76c-.5-.25-2.94-1.45-3.4-1.62-.45-.17-.78-.25-1.1.25-.33.49-1.28 1.61-1.57 1.95-.28.33-.57.37-1.06.12-.49-.24-2.05-.75-3.9-2.38-1.44-1.28-2.42-2.84-2.7-3.32-.28-.48-.03-.74.21-.98.22-.22.5-.57.73-.86.25-.28.33-.49.5-.82.16-.33.08-.62-.05-.87-.12-.24-1.1-2.65-1.5-3.63-.4-.96-.82-.83-1.1-.84h-.94c-.33 0-.86.12-1.31.62-.45.49-1.72 1.68-1.72 4.1 0 2.4 1.76 4.74 2 5.07.24.33 3.44 5.24 8.34 7.34 1.16.5 2.07.8 2.78 1.02 1.17.37 2.23.31 3.08.18.94-.14 2.94-1.2 3.35-2.37.4-1.16.4-2.15.28-2.37-.12-.2-.45-.32-.94-.57Z"
        />
      </svg>
    </motion.a>
  )
}
