"use client"

import { useState } from "react"
import { WorldMap } from "@/components/map/world-map"
import { ScenarioPanel } from "@/components/scenarios/scenario-panel"
import { AppHeader } from "@/components/layout/app-header"
import { AnimatePresence } from "framer-motion"
import { DEFAULT_ATLANTIS_PARAMS, type AtlantisParams } from "@/lib/atlantis"

interface ReasoningStep {
  step: number
  fact: string
  conclusion: string
  weight: number
}

interface Scenario {
  type: "positive" | "negative"
  timeframe: "12" | "36"
  title: string
  description: string
  probability: string
  impact_on_atlantis: {
    economy: number
    security: number
    energy: number
    technology: number
  }
  keyFactors: string[]
  reasoning: (ReasoningStep | string)[] // Może być tablica obiektów lub stringów
}

interface Source {
  title: string
  url: string
  date: string
  reliability: "high" | "medium" | "low"
  relevance: number
}

interface ScenarioContext {
  currentSituation: string
  geopoliticalFactors: string[]
  recentNews: string[]
}

interface Recommendations {
  avoid_negative: string[]
  achieve_positive: string[]
  priority_actions: {
    action: string
    timeframe: string
    impact: "high" | "medium" | "low"
  }[]
}

interface ScenarioData {
  scenarios: Scenario[]
  context: ScenarioContext
  sources: Source[]
  reasoning_summary: string
  recommendations: Recommendations
}

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string
    name: string
  } | null>(null)
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null)
  const [context, setContext] = useState<ScenarioContext | null>(null)
  const [sources, setSources] = useState<Source[] | null>(null)
  const [reasoningSummary, setReasoningSummary] = useState<string | null>(null)
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCountryClick = async (code: string, name: string) => {
    setSelectedCountry({ code, name })
    setLoading(true)
    setScenarios(null)
    setContext(null)
    setSources(null)
    setReasoningSummary(null)
    setRecommendations(null)

    try {
      // Timeout 90s dla stabilności (DeepSeek może być wolny)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 90000)

      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: name,
          atlantisParams: DEFAULT_ATLANTIS_PARAMS,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error("Failed to fetch scenarios")
      }

      const data: ScenarioData = await response.json()
      setScenarios(data.scenarios)
      setContext(data.context)
      setSources(data.sources)
      setReasoningSummary(data.reasoning_summary)
      setRecommendations(data.recommendations)
    } catch (error) {
      console.error("Error fetching scenarios:", error)
      // TODO: Add toast notification for error
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSelectedCountry(null)
    setScenarios(null)
    setContext(null)
    setSources(null)
    setReasoningSummary(null)
    setRecommendations(null)
  }

  return (
    <div className="h-screen flex flex-col">
      <AppHeader title="Scenariusze Przyszłości" />

      {/* Info Bar */}
      {!selectedCountry && (
        <div className="bg-primary/10 border-b px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <svg
              className="w-5 h-5 text-primary shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <p className="text-sm font-medium">
              <span className="hidden sm:inline">
                Kliknij w dowolny kraj na mapie, aby wygenerować 3 scenariusze
                przyszłości
              </span>
              <span className="sm:hidden">
                Wybierz kraj aby zobaczyć scenariusze AI
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 relative overflow-hidden">
        <WorldMap
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry?.code}
        />

        <AnimatePresence>
          {selectedCountry && (
            <ScenarioPanel
              country={selectedCountry.name}
              scenarios={scenarios}
              context={context}
              sources={sources}
              reasoningSummary={reasoningSummary}
              recommendations={recommendations}
              loading={loading}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
