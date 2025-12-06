"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import Image from "next/image"
import { Check } from "lucide-react"

interface FeatureImageSectionProps {
  title: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
}

export function FeatureImageSection({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  imagePosition = "right",
}: FeatureImageSectionProps) {
  return (
    <section className="section-spacing border-t border-border">
      <div className="container-section">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${
            imagePosition === "left" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <motion.div
            variants={fadeInUp}
            className={imagePosition === "left" ? "lg:order-2" : ""}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            {/* Feature List */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3 group"
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center group-hover:scale-110 transition-all"
                    style={{
                      backgroundColor: "hsl(142, 76%, 36%, 0.1)",
                      border: "1px solid hsl(142, 76%, 36%, 0.2)",
                    }}
                  >
                    <Check
                      className="w-3.5 h-3.5 transition-colors"
                      style={{ color: "hsl(142, 76%, 36%)" }}
                    />
                  </div>
                  <span className="text-base text-foreground/90 leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeInUp}
            className={imagePosition === "left" ? "lg:order-1" : ""}
          >
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border bg-muted shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
