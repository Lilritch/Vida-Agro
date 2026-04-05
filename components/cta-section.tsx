"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface CTASectionProps {
  blendFromDark?: boolean;
}

export function CTASection({ blendFromDark = false }: CTASectionProps) {
  return (
    <section
      data-aos="fade-up"
      className={`relative overflow-hidden ${
        blendFromDark
          ? "bg-[linear-gradient(180deg,#173626_0%,#1a3d2e_16%,#1f4634_44%,#224d39_68%,#f5f0e1_100%)] py-20 lg:py-32"
          : "bg-gradient-to-br from-forest-green via-forest-green to-forest-green-dark py-20 lg:py-32"
      }`}
    >
      {blendFromDark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#173626] to-transparent"
        />
      ) : null}

      {/* Background decorations */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: "rgba(201, 162, 39, 0.05)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          style={{ backgroundColor: "rgba(201, 162, 39, 0.05)" }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`mx-auto max-w-3xl text-center ${blendFromDark ? "lg:-mt-4" : ""}`}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Ready to Transform Your Farm?
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-6"
          >
            Let&apos;s Grow Your Success Together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-cream text-lg mb-10 leading-relaxed"
            style={{ opacity: 0.7 }}
          >
            Whether you&apos;re a smallholder farmer in Ashanti Region or
            managing a commercial operation, we have the products and expertise
            to help you succeed. Contact us today for personalized advice.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Talk to an Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>{" "}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
