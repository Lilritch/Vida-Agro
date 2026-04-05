"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site-config";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTransparentHomeHeader =
    pathname === "/" && !isScrolled && !isMobileMenuOpen;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY < 24;
      const scrollingUp = currentScrollY < lastScrollY;

      setIsScrolled(currentScrollY > 24);
      setIsVisible(isNearTop || scrollingUp || isMobileMenuOpen);
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -36, opacity: 0 }}
        animate={{
          y: isVisible || isMobileMenuOpen ? 0 : -140,
          opacity: isVisible || isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="fixed inset-x-0 top-4 z-50 px-4 lg:top-6 lg:px-8 container mx-auto"
      >
        <div
          className={cn(
            "w-full rounded-[28px] border transition-all duration-300",
            isTransparentHomeHeader
              ? "border-transparent bg-transparent shadow-none backdrop-blur-0"
              : "border-forest-green/10 bg-white/90 shadow-[0_20px_55px_rgba(13,31,20,0.18)] backdrop-blur-xl",
          )}
        >
          <nav
            className={cn(
              "flex items-center justify-between px-5 lg:px-7 transition-all duration-300",
              isScrolled ? "py-3" : "py-4",
            )}
          >
            <Link href="/" aria-label="Go to homepage">
              <Logo
                size={isScrolled ? "sm" : "md"}
                variant={isTransparentHomeHeader ? "light" : "dark"}
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group relative font-medium transition-colors",
                      isActive
                        ? "text-gold"
                        : isTransparentHomeHeader
                          ? "text-cream hover:text-gold"
                          : "text-forest-green hover:text-gold",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={cn(
                  "rounded-full px-6 py-2.5 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105",
                  pathname === "/contact" && !isTransparentHomeHeader
                    ? "bg-forest-green text-cream"
                    : isTransparentHomeHeader
                      ? "border border-cream/35 bg-cream/10 text-cream hover:bg-cream/18"
                      : "bg-gold hover:bg-gold-dark text-charcoal",
                )}
              >
                Contact Us
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "md:hidden p-2 transition-colors",
                isTransparentHomeHeader
                  ? "text-cream hover:text-gold"
                  : "text-forest-green hover:text-gold",
              )}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-forest-green/95 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col px-4 pt-24 pb-8">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cream/60">
                  Navigation
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-cream hover:text-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col items-center justify-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-3xl font-serif font-bold transition-colors",
                        isActiveLink(link.href)
                          ? "text-gold"
                          : "text-cream hover:text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300"
                  >
                    Get In Touch
                  </Link>
                </motion.div>
              </nav>

              <div
                className="p-6 text-center text-cream text-sm"
                style={{ opacity: 0.6 }}
              >
                Protecting Crops. Controlling Vectors. Empowering Ghana.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
