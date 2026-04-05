"use client"

import { motion } from "framer-motion"

const partners = [
  { name: "Ghana EPA", description: "Environmental Protection Agency" },
  { name: "COCOBOD", description: "Ghana Cocoa Board" },
  { name: "MoFA", description: "Ministry of Food & Agriculture" },
  { name: "PPRSD", description: "Plant Protection Division" },
  { name: "GAIDA", description: "Ghana Agri Input Dealers Association" },
]

export function Partners() {
  return (
    <section className="py-12 bg-cream" style={{ borderTop: '1px solid rgba(26, 61, 46, 0.1)', borderBottom: '1px solid rgba(26, 61, 46, 0.1)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-forest-green text-sm font-medium uppercase tracking-wider" style={{ opacity: 0.5 }}>
            Trusted & Certified by
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(26, 61, 46, 0.1)' }}>
                <span className="font-serif font-bold text-forest-green text-lg">
                  {partner.name.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
              <div className="font-semibold text-forest-green text-sm">
                {partner.name}
              </div>
              <div className="text-forest-green text-xs" style={{ opacity: 0.5 }}>
                {partner.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
