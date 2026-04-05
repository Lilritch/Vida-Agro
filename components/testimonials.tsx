"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ama Boateng",
    location: "Ejura, Ashanti Region",
    role: "Maize Farmer",
    rating: 5,
    text: "Vida Agrochemicals has transformed my farm. Their fertilizers and the expert advice I received helped me double my maize yield this season. The team is always available to answer my questions."
  },
  {
    id: 2,
    name: "Kofi Mensah",
    location: "Techiman, Bono East",
    role: "Cocoa Farmer",
    rating: 5,
    text: "I have been buying from Vida for three years now. Their pesticides are genuine and effective. My cocoa trees are healthier than ever, and I trust their products completely."
  },
  {
    id: 3,
    name: "Grace Osei",
    location: "Sunyani, Bono Region",
    role: "Vegetable Farmer",
    rating: 5,
    text: "The delivery service to my farm is excellent. I no longer have to travel to Kumasi for supplies. The team understands the needs of smallholder farmers like me."
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const next = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-gold font-semibold tracking-wider uppercase text-sm mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green">
            What Farmers Say About Us
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-cream rounded-3xl p-8 lg:p-12 relative"
              >
                <Quote className="absolute top-8 left-8 w-12 h-12 text-gold" style={{ opacity: 0.3 }} />
                
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-forest-green text-center leading-relaxed mb-8 font-serif italic">
                    &ldquo;{testimonials[current].text}&rdquo;
                  </blockquote>
                  
                  {/* Author */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-forest-green mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-cream">
                        {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="font-semibold text-forest-green text-lg">
                      {testimonials[current].name}
                    </div>
                    <div className="text-forest-green text-sm" style={{ opacity: 0.6 }}>
                      {testimonials[current].role} &bull; {testimonials[current].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-forest-green hover:bg-forest-green-dark text-cream flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrent(index)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === current ? "bg-gold w-8" : "bg-forest-green w-2.5"
                  }`}
                  style={{ opacity: index === current ? 1 : 0.3 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-forest-green hover:bg-forest-green-dark text-cream flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
