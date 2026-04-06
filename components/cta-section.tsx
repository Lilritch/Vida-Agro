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
  blendToDark?: boolean;
}

export function CTASection({
  blendFromDark = false,
  blendToDark = false,
}: CTASectionProps) {
  const useWhiteContent = blendFromDark || blendToDark;

  return (
    <section
      data-aos="fade-up"
      className={`relative overflow-hidden ${
        blendFromDark
          ? "bg-[linear-gradient(180deg,#08110c_0%,#0d1f14_12%,#143526_36%,#1b4330_58%,#123120_78%,#08130d_100%)] py-20 lg:py-32"
          : blendToDark
            ? "bg-[linear-gradient(180deg,#1e4b37_0%,#1a4331_24%,#153526_48%,#0f261a_72%,#08110c_100%)] py-20 lg:py-32"
          : "bg-gradient-to-br from-forest-green via-forest-green to-forest-green-dark py-20 lg:py-32"
      }`}
    >
      {blendFromDark || blendToDark ? (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-0 h-36 ${
              blendToDark
                ? "bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.96)_8%,rgba(245,240,225,0.62)_18%,transparent_72%)]"
                : "bg-[linear-gradient(180deg,#08110c_0%,rgba(8,17,12,0.92)_14%,rgba(8,17,12,0.56)_34%,transparent_72%)]"
            }`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#08130d_0%,rgba(8,19,13,0.94)_20%,rgba(8,19,13,0.48)_46%,transparent_78%)]"
          />
        </>
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
          className={`mx-auto max-w-3xl text-center ${
            blendFromDark || blendToDark ? "lg:-mt-4" : ""
          }`}
        >
          <motion.span
            variants={fadeUp}
            className={`mb-4 inline-block text-sm font-semibold uppercase tracking-wider ${
              useWhiteContent ? "text-white/82" : "text-gold"
            }`}
          >
            Ready to Transform Your Farm?
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className={`mb-6 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl ${
              useWhiteContent ? "text-white" : "text-cream"
            }`}
          >
            Let&apos;s Grow Your Success Together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className={`mb-10 text-lg leading-relaxed ${
              useWhiteContent ? "text-white/80" : "text-cream"
            }`}
            style={useWhiteContent ? undefined : { opacity: 0.7 }}
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
              className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 ${
                useWhiteContent
                  ? "border border-white/20 bg-white/8 text-white hover:bg-white/14 hover:shadow-[0_18px_44px_rgba(255,255,255,0.08)]"
                  : "bg-gold text-charcoal hover:bg-gold-dark hover:shadow-xl"
              }`}
            >
              Talk to an Expert
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>{" "}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
