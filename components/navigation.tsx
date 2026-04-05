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
  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");

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
        className="fixed inset-x-0 top-4 z-50 px-4 lg:top-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="w-full rounded-[30px] border border-white/18 bg-forest-green/12 shadow-[0_14px_36px_rgba(13,31,20,0.12)] backdrop-blur-md transition-all duration-300">
            <nav
              className={cn(
                "flex items-center gap-4 px-4 lg:px-6 transition-all duration-300",
                isScrolled ? "py-3" : "py-4",
              )}
            >
              <Link href="/" aria-label="Go to homepage" className="shrink-0">
                <Logo size={isScrolled ? "sm" : "md"} variant="light" />
              </Link>

              <div className="hidden min-w-0 flex-1 items-center md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-6">
                <div className="flex items-center justify-evenly">
                  {primaryLinks.map((link) => {
                    const isActive = isActiveLink(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "group relative px-2 py-2 text-lg font-bold tracking-[0.015em] text-white drop-shadow-[0_3px_16px_rgba(13,31,20,0.78)] transition-colors duration-300 lg:text-[1.18rem]",
                          isActive ? "text-[#ffe38f]" : "hover:text-[#fff1bf]",
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-2 right-2 h-1 rounded-full bg-[#ffd66b] shadow-[0_0_16px_rgba(255,214,107,0.9)] transition-all duration-300",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "rounded-full border border-cream/55 bg-cream/12 px-6 py-3 text-lg font-bold text-white shadow-[0_12px_30px_rgba(13,31,20,0.2)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-gold hover:bg-cream/20 hover:text-[#fff1bf] lg:text-[1.08rem]",
                    pathname === "/contact" ? "border-gold text-[#fff1bf]" : "",
                  )}
                >
                  Contact Us
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="ml-auto p-2 text-cream transition-colors hover:text-gold md:hidden"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </nav>
          </div>
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
                {primaryLinks.map((link, index) => (
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
                  transition={{ delay: primaryLinks.length * 0.1 }}
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
