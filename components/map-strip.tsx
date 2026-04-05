"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"

export function MapStrip() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Suame+Kumasi+Ghana"

  return (
    <section className="bg-forest-green py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201, 162, 39, 0.2)' }}>
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <span className="text-cream font-medium">
              Plot 17 Block B, Suame-Kumasi, Ashanti Region, Ghana
            </span>
          </div>
          
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold transition-colors"
          >
            Get Directions
            <Navigation className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
