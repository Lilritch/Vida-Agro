"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Users, Heart } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const reasons = [
  {
    icon: Shield,
    stat: "EPA",
    title: "Licensed",
    description: "All our products are EPA-certified and compliant with Ghana standards."
  },
  {
    icon: Clock,
    stat: "24h",
    title: "Response",
    description: "Fast turnaround for urgent farm needs and emergency pest situations."
  },
  {
    icon: Users,
    stat: "Expert",
    title: "Guidance",
    description: "Certified agronomists and field advisors ready to support your farm."
  },
  {
    icon: Heart,
    stat: "100%",
    title: "Ghanaian",
    description: "Local ownership with deep commitment to community reinvestment."
  }
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-forest-green relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(201, 162, 39, 0.05)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(201, 162, 39, 0.05)' }} />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-6"
          >
            Your Trusted Partner in Agriculture
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-cream text-lg max-w-2xl mx-auto"
            style={{ opacity: 0.7 }}
          >
            We combine quality products with expert knowledge to deliver results 
            that Ghanaian farmers can depend on.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group bg-forest-green-dark backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-forest-green-light transition-all duration-300"
              style={{ border: '1px solid rgba(245, 240, 225, 0.1)' }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors"
                style={{ backgroundColor: 'rgba(201, 162, 39, 0.2)' }}
              >
                <reason.icon className="w-8 h-8 text-gold" />
              </div>
              
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl font-bold text-gold">{reason.stat}</span>
                <span className="text-xl font-semibold text-cream">{reason.title}</span>
              </div>
              
              <p className="text-cream text-sm leading-relaxed" style={{ opacity: 0.6 }}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
