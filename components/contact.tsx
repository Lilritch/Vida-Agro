"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Check, 
  Loader2,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react"

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

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

const subjects = [
  "Product Enquiry",
  "Agronomic Advice",
  "Vector Control Service",
  "Bulk/Wholesale Order",
  "Partnership",
  "Other"
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Plot 17 Block B, Suame-Kumasi",
    subValue: "Ashanti Region, Ghana, West Africa"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0245 407 874",
    href: "tel:+233245407874"
  },
  {
    icon: Mail,
    label: "Email",
    value: "vidaagrochemicals@gmail.com",
    href: "mailto:vidaagrochemicals@gmail.com"
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 8:00am – 5:30pm",
    subValue: "Sat: 9:00am – 2:00pm"
  }
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/233245407874" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:vidaagrochemicals@gmail.com" },
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create mailto link as fallback
    const mailtoLink = `mailto:vidaagrochemicals@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
    `)}`
    
    window.open(mailtoLink, '_blank')
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-block text-gold font-semibold tracking-wider uppercase text-sm mb-4"
            >
              Reach Us
            </motion.span>
            
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green mb-4"
            >
              Let&apos;s Grow Together
            </motion.h2>
            
            <motion.p
              variants={fadeUp}
              className="text-forest-green text-lg mb-10"
              style={{ opacity: 0.7 }}
            >
              Have a question about our products? Need farm advice? We&apos;re always here to help.
            </motion.p>

            {/* Contact Items */}
            <motion.div variants={stagger} className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(26, 61, 46, 0.1)' }}>
                    <item.icon className="w-6 h-6 text-forest-green" />
                  </div>
                  <div>
                    <div className="text-sm mb-1 text-forest-green" style={{ opacity: 0.6 }}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-semibold text-forest-green hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold text-forest-green">{item.value}</div>
                    )}
                    {item.subValue && (
                      <div className="text-forest-green text-sm" style={{ opacity: 0.6 }}>{item.subValue}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp} className="mb-10">
              <a
                href="https://wa.me/233245407874?text=Hello%20Vida%20Asamoah%20Agrochemicals%2C%20I%20would%20like%20to%20enquire%20about..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp}>
              <div className="text-sm mb-4 text-forest-green" style={{ opacity: 0.6 }}>Follow us</div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl hover:bg-forest-green hover:text-cream flex items-center justify-center text-forest-green transition-all duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: 'rgba(26, 61, 46, 0.1)' }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={fadeUp}>
            <div className="bg-cream rounded-3xl p-8 lg:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-forest-green mx-auto mb-6 flex items-center justify-center">
                    <Check className="w-10 h-10 text-cream" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest-green mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-forest-green" style={{ opacity: 0.7 }}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-forest-green mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all text-forest-green"
                        style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                        placeholder="Kwame"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-forest-green mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all text-forest-green"
                        style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                        placeholder="Asante"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest-green mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all text-forest-green"
                      style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                      placeholder="kwame@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-forest-green mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all text-forest-green"
                      style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                      placeholder="024 XXX XXXX"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-forest-green mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      {...register("subject")}
                      className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all text-forest-green"
                      style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-forest-green mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border bg-white focus:border-gold focus:ring-2 outline-none transition-all resize-none text-forest-green"
                      style={{ borderColor: 'rgba(26, 61, 46, 0.2)' }}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest-green hover:bg-forest-green-dark text-cream font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-forest-green text-sm flex items-center justify-center gap-2" style={{ opacity: 0.5 }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Your information is private and will never be shared.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
