"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Leaf } from "lucide-react"
import { Logo } from "@/components/logo"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-forest-green flex items-center justify-center p-4">
      <div className="absolute inset-0 dot-grid opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        <Logo 
          size="lg" 
          variant="light"
          className="justify-center mb-8"
        />
        
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Leaf className="w-24 h-24 text-gold mx-auto" />
          </motion.div>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-cream mb-4">
          404
        </h1>
        
        <h2 className="font-serif text-2xl md:text-3xl text-gold mb-4">
          Lost in the Field?
        </h2>
        
        <p className="text-cream mb-10 leading-relaxed" style={{ opacity: 0.7 }}>
          The page you&apos;re looking for seems to have wandered off the farm. 
          Let&apos;s get you back to familiar ground.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-cream font-semibold px-6 py-3 rounded-full transition-all duration-300"
            style={{ border: '2px solid rgba(245, 240, 225, 0.3)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.3)'}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  )
}
