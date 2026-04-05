"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { heroMedia } from "@/lib/site-config";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const hasHeroVideo = heroMedia.videoSrc.trim().length > 0;

  const toggleVideoPlayback = async () => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (videoElement.paused) {
      try {
        await videoElement.play();
        setIsVideoPaused(false);
      } catch {
        setIsVideoPaused(true);
      }

      return;
    }

    videoElement.pause();
    setIsVideoPaused(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-[78svh] overflow-hidden rounded-bl-[150px] bg-forest-green"
    >
      <div className="absolute inset-0">
        {hasHeroVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onPause={() => setIsVideoPaused(true)}
            onPlay={() => setIsVideoPaused(false)}
          >
            <source src={heroMedia.videoSrc} />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,20,0.08)_0%,rgba(13,31,20,0.16)_35%,rgba(13,31,20,0.64)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,20,0.74)_0%,rgba(13,31,20,0.34)_34%,rgba(13,31,20,0.12)_100%)]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <div className="container mx-auto flex min-h-[78svh] items-end px-4 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="ml-3 max-w-[32rem] sm:ml-6 lg:ml-10">
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-[29rem] font-serif text-[2.8rem] font-bold leading-[0.96] tracking-[-0.03em] text-cream drop-shadow-[0_12px_28px_rgba(13,31,20,0.26)] sm:text-[3.35rem] lg:text-[3.9rem]"
            >
              Modern Inputs,
              <span className="block text-gold">Field Confidence,</span>
              <span className="block">Better Harvests.</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-forest-green shadow-[0_18px_40px_rgba(13,31,20,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream"
              >
                Talk to Our Team
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {hasHeroVideo ? (
        <motion.button
          type="button"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.24 }}
          onClick={toggleVideoPlayback}
          className="absolute bottom-5 right-5 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-forest-green shadow-[0_18px_42px_rgba(13,31,20,0.24)] transition-all duration-300 hover:scale-105 hover:bg-cream lg:bottom-7 lg:right-7"
          aria-label={isVideoPaused ? "Play hero video" : "Pause hero video"}
        >
          {isVideoPaused ? (
            <Play className="h-4 w-4 fill-current" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </motion.button>
      ) : null}
    </section>
  );
}
