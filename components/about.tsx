"use client"

import { motion } from "framer-motion"
import { Check, Award, MapPin, Globe } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const values = [
  {
    title: "Quality Assurance",
    description: "EPA-registered, internationally sourced products meeting the highest standards."
  },
  {
    title: "Community Impact",
    description: "Farmer education, rural outreach programs, and public health initiatives."
  },
  {
    title: "Sustainability",
    description: "Integrated pest management and responsible chemical use practices."
  }
]

const badges = [
  { icon: Award, label: "Ghana EPA Licensed" },
  { icon: MapPin, label: "Kumasi-Based" },
  { icon: Globe, label: "West Africa Serving" },
]

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Kente-inspired pattern background */}
      <div className="absolute inset-0 kente-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Quote Card */}
          <motion.div variants={fadeUp}>
            <div className="bg-forest-green rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: 'rgba(201, 162, 39, 0.1)' }} />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: 'rgba(201, 162, 39, 0.1)' }} />
              
              <div className="relative z-10">
                <svg 
                  className="w-12 h-12 text-gold mb-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <blockquote className="font-serif text-xl lg:text-2xl text-cream leading-relaxed italic mb-8">
                  We are committed to empowering Ghanaian farmers with the tools, knowledge, 
                  and products they need to thrive — sustainably and profitably.
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                    <span className="font-serif font-bold text-charcoal text-lg">VA</span>
                  </div>
                  <div>
                    <div className="font-semibold text-cream">Vida Asamoah</div>
                    <div className="text-cream text-sm" style={{ opacity: 0.6 }}>Founder & CEO</div>
                  </div>
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mt-8 pt-8" style={{ borderTop: '1px solid rgba(245, 240, 225, 0.2)' }}>
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full px-4 py-2"
                    style={{ backgroundColor: 'rgba(245, 240, 225, 0.1)' }}
                  >
                    <badge.icon className="w-4 h-4 text-gold" />
                    <span className="text-cream text-sm font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold font-semibold tracking-wider uppercase text-sm mb-4"
            >
              About Us
            </motion.span>
            
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green mb-6"
            >
              Rooted in Ghana, Growing with You
            </motion.h2>
            
            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              <p className="text-forest-green leading-relaxed" style={{ opacity: 0.7 }}>
                Founded in Kumasi, the heart of Ghana&apos;s Ashanti Region, Vida Asamoah Agrochemicals 
                & Vector Control Limited was established with a singular mission: to empower 
                smallholder and commercial farmers with access to quality agricultural inputs.
              </p>
              <p className="text-forest-green leading-relaxed" style={{ opacity: 0.7 }}>
                Strategically located in Suame — Ghana&apos;s largest automotive and commercial 
                district — we serve as a vital link between international agrochemical 
                manufacturers and the hardworking farmers who feed our nation.
              </p>
              <p className="text-forest-green leading-relaxed" style={{ opacity: 0.7 }}>
                Our commitment extends beyond sales. We believe in building lasting relationships 
                through education, technical support, and community engagement.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div variants={stagger} className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(201, 162, 39, 0.2)' }}>
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-green">{value.title}</h4>
                    <p className="text-forest-green text-sm" style={{ opacity: 0.6 }}>{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
