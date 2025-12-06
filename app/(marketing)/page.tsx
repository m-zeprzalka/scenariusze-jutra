import { Hero } from "@/components/marketing/hero"
import { ProblemCards } from "@/components/marketing/problem-cards"
import { SolutionBento } from "@/components/marketing/solution-bento"
import { ImpactMetrics } from "@/components/marketing/impact-metrics"
import { TechStackBadges } from "@/components/marketing/tech-stack-badges"
import { FeatureImageSection } from "@/components/marketing/feature-image-section"
import { CONTENT } from "@/lib/content"

export default function Home() {
  return (
    <>
      {/* HACK: Edytuj teksty w lib/content.ts */}

      <Hero
        title={CONTENT.hero.title}
        subtitle={CONTENT.hero.subtitle}
        ctaPrimary={CONTENT.hero.ctaPrimary}
        ctaSecondary={CONTENT.hero.ctaSecondary}
      />

      <ProblemCards problems={CONTENT.problems} />
      {/* Feature with Image Section - Premium SaaS Style */}
      <FeatureImageSection
        title="Zmieniamy sposób przewidywania przyszłości Geopolitycznej"
        description="Stworzone z myślą o wymaganiach instytucji państwowych. Bezpieczeństwo, wydajność i intuicyjna obsługa."
        features={[
          "Zgodność z wymogami bezpieczeństwa państwowych",
          "Intuicyjny interfejs w postaci interaktywnej mapy",
          "Superszybkie analizy dużych zbiorów danych",
          "Skalowalna architektura z mozliwością rozbudowy",
        ]}
        imageSrc="/vis.jpg"
        imageAlt="Dashboard aplikacji"
        imagePosition="right"
      />
      <SolutionBento features={CONTENT.features} />

      <ImpactMetrics metrics={CONTENT.metrics} />

      <TechStackBadges stack={CONTENT.tech} />
    </>
  )
}
