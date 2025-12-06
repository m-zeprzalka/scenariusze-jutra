"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface HeroProps {
  title: string
  subtitle: string
  description?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

export function Hero({
  title,
  subtitle,
  description,
  ctaPrimary = "Uruchom Demo",
  ctaSecondary = "Dokumentacja",
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 px-4 sm:px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-5xl mx-auto text-center w-full"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            HackNation 2025 - Bydgoszcz
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
        >
          <span className="gradient-text">{title}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 sm:mb-4 max-w-3xl mx-auto px-4"
        >
          {subtitle}
        </motion.p>

        {/* Optional Description */}
        {description && (
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-muted-foreground/80 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          >
            {description}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mt-8"
        >
          <Button
            asChild
            size="lg"
            className="group w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href="/dashboard">
              {ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="group w-full sm:w-auto"
          >
            <Link href="#problem-cards">
              <FileText className="mr-2 h-4 w-4" />
              {ctaSecondary}
            </Link>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={fadeInUp} className="mt-12 sm:mt-20">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
            <span className="text-xs sm:text-sm">Zobacz Szczegóły</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
