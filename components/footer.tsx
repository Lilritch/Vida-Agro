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
    <footer className="bg-charcoal relative">
      {/* Kente-inspired top border */}
      <div className="h-2 w-full bg-gradient-to-r from-gold via-forest-green to-gold" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Logo size="lg" variant="light" className="mb-6" />
            <p className="text-cream leading-relaxed mb-6" style={{ opacity: 0.6 }}>
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
          <div>
            <h4 className="font-serif font-bold text-cream text-lg mb-6">Company</h4>
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
          <div>
            <h4 className="font-serif font-bold text-cream text-lg mb-6">Services</h4>
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
          <div>
            <h4 className="font-serif font-bold text-cream text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-cream" style={{ opacity: 0.6 }}>
                  Plot 17 Block B, Suame-Kumasi,<br />
                  Ashanti Region, Ghana
                </span>
              </li>
              <li>
                <a
                  href="tel:+233245407874"
                  className="flex items-center gap-3 text-cream hover:text-gold transition-colors"
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
                  className="flex items-center gap-3 text-cream hover:text-gold transition-colors break-all"
                  style={{ opacity: 0.6 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  vidaagrochemicals@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(245, 240, 225, 0.1)' }}>
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream text-sm text-center sm:text-left" style={{ opacity: 0.4 }}>
              &copy; {currentYear} Vida Asamoah Agrochemicals & Vector Control Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-cream hover:text-gold text-sm transition-colors"
                style={{ opacity: 0.4 }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-cream hover:text-gold text-sm transition-colors"
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
