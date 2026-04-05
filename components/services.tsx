"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Leaf, Bug, Heart, BookOpen, Truck } from "lucide-react"
import { servicesGallery } from "@/lib/site-config"
import { CropDiagnosticTool } from "@/components/crop-diagnostic-tool"

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

const services = [
  {
    icon: Shield,
    title: "Crop Protection",
    description: "Herbicides, pesticides, and fungicides for Ghanaian cash crops including maize, cocoa, rice, and vegetables."
  },
  {
    icon: Leaf,
    title: "Soil Fertility Solutions",
    description: "Premium fertilizers and soil amendments specially formulated for tropical Ghanaian soils."
  },
  {
    icon: Bug,
    title: "Vector & Pest Control",
    description: "Comprehensive mosquito, rodent, and public pest control for homes, farms, and institutions."
  },
  {
    icon: Heart,
    title: "Public Health Products",
    description: "Insecticides, repellents, and disinfectants for malaria prevention and community sanitation."
  },
  {
    icon: BookOpen,
    title: "Agronomic Advisory",
    description: "On-farm technical guidance, crop scouting, and integrated pest management recommendations."
  },
  {
    icon: Truck,
    title: "Input Supply & Delivery",
    description: "Seeds, planting materials, and farm tools with delivery across Kumasi and the Ashanti Region."
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
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
            What We Offer
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green mb-6"
          >
            Comprehensive Agricultural Solutions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-forest-green text-lg max-w-2xl mx-auto"
            style={{ opacity: 0.7 }}
          >
            From crop protection to public health, we provide everything Ghanaian farmers 
            and communities need to thrive.
          </motion.p>
        </motion.div>

        {servicesGallery.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12"
          >
            {servicesGallery.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-forest-green mb-2">
                    {item.title}
                  </h3>
                  <p className="text-forest-green leading-relaxed" style={{ opacity: 0.7 }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover border effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="w-14 h-14 rounded-xl bg-forest-green flex items-center justify-center mb-6 group-hover:bg-forest-green-light transition-colors">
                <service.icon className="w-7 h-7 text-gold" />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-forest-green mb-3">
                {service.title}
              </h3>
              
              <p className="text-forest-green leading-relaxed" style={{ opacity: 0.7 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CropDiagnosticTool />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
