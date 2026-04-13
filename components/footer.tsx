"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { navLinks } from "@/lib/site-config"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageCircle 
} from "lucide-react"

const companyLinks = [
  navLinks[0],
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
]

const serviceLinks = [
  { label: "Crop Protection", href: "/services" },
  { label: "Soil Fertility", href: "/services" },
  { label: "Vector Control", href: "/services" },
  { label: "Public Health", href: "/services" },
  { label: "Farm Advisory", href: "/services" },
  { label: "Input Delivery", href: "/services" },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/233245407874" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative -mt-px overflow-hidden bg-[linear-gradient(180deg,#06100b_0%,#06100b_18%,#050e0a_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(6,16,11,0.94)_0%,rgba(6,16,11,0.64)_32%,transparent_100%)]"
      />
      
      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="max-w-sm lg:col-span-1">
            <Logo size="lg" variant="light" className="mb-6" />
            <p className="mb-6 max-w-[18rem] text-sm leading-6 text-cream sm:text-base sm:leading-relaxed" style={{ opacity: 0.6 }}>
              Protecting Crops. Controlling Vectors. Empowering Ghana.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full text-cream hover:text-charcoal hover:bg-gold flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(245, 240, 225, 0.1)' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="max-w-sm">
            <h4 className="mb-5 font-serif text-lg font-bold text-cream">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream hover:text-gold transition-colors"
                    style={{ opacity: 0.6 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="max-w-sm">
            <h4 className="mb-5 font-serif text-lg font-bold text-cream">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream hover:text-gold transition-colors"
                    style={{ opacity: 0.6 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="max-w-sm">
            <h4 className="mb-5 font-serif text-lg font-bold text-cream">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="max-w-[15rem] text-sm leading-6 text-cream sm:max-w-[16rem] sm:text-base" style={{ opacity: 0.6 }}>
                  Plot 17 Block B, Suame-Kumasi,<br />
                  Ashanti Region, Ghana
                </span>
              </li>
              <li>
                <a
                  href="tel:+233245407874"
                  className="flex items-center gap-3 text-sm text-cream transition-colors hover:text-gold sm:text-base"
                  style={{ opacity: 0.6 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  0245 407 874
                </a>
              </li>
              <li>
                <a
                  href="mailto:vidaagrochemicals@gmail.com"
                  className="flex max-w-[17rem] items-start gap-3 text-sm text-cream transition-colors hover:text-gold sm:max-w-[16rem] sm:text-base"
                  style={{ opacity: 0.6 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="leading-6 break-words">vidaagrochemicals@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
            <p className="max-w-[18rem] text-center text-sm leading-6 text-cream sm:max-w-md sm:text-left" style={{ opacity: 0.4 }}>
              &copy; {currentYear} Vida Asamoah Agrochemicals & Vector Control Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-end">
              <Link
                href="#"
                className="text-sm text-cream transition-colors hover:text-gold"
                style={{ opacity: 0.4 }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-cream transition-colors hover:text-gold"
                style={{ opacity: 0.4 }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
