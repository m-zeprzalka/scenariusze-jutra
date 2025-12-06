"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, XCircle, Ban, LucideIcon } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface Problem {
  title: string
  description: string
  icon?: LucideIcon
}

interface ProblemCardsProps {
  problems: Problem[]
}

const defaultIcons = [AlertTriangle, XCircle, Ban]

export function ProblemCards({ problems }: ProblemCardsProps) {
  return (
    <section id="problem-cards" className="section-spacing px-4 sm:px-6">
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-title mb-3 sm:mb-4 px-4">
            Problem, który rozwiązujemy
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Obecne rozwiązania nie spełniają wymagań. Czas na zmianę.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {problems.map((problem, index) => {
            const Icon =
              problem.icon || defaultIcons[index % defaultIcons.length]

            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-destructive/20 bg-destructive/5 hover:border-destructive/40 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-5 sm:p-6">
                    {/* Icon */}
                    <div className="mb-3 sm:mb-4">
                      <div className="inline-flex p-2.5 sm:p-3 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {problem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
