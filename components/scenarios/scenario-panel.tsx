"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Minus,
  TrendingDown,
  Loader2,
  X,
  Calendar,
  Percent,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Ban,
  Network,
  Shield,
  Target,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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

interface Recommendations {
  avoid_negative: string[]
  achieve_positive: string[]
  priority_actions: {
    action: string
    timeframe: string
    impact: "high" | "medium" | "low"
  }[]
}

interface ScenarioPanelProps {
  country: string
  scenarios: Scenario[] | null
  context: {
    currentSituation: string
    geopoliticalFactors: string[]
    recentNews: string[]
  } | null
  sources: Source[] | null
  reasoningSummary: string | null
  recommendations: Recommendations | null
  loading: boolean
  onClose: () => void
}

const scenarioConfig = {
  positive: {
    icon: TrendingUp,
    label: "Pozytywny dla Atlantis",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    badgeColor:
      "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
  negative: {
    icon: TrendingDown,
    label: "Negatywny dla Atlantis",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    badgeColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  },
}

const reliabilityConfig = {
  high: {
    icon: CheckCircle2,
    label: "Wysoka wiarygodność",
    color: "text-green-600 dark:text-green-400",
    badgeColor:
      "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
  medium: {
    icon: AlertCircle,
    label: "Średnia wiarygodność",
    color: "text-yellow-600 dark:text-yellow-400",
    badgeColor:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
  },
  low: {
    icon: Ban,
    label: "Niska wiarygodność",
    color: "text-red-600 dark:text-red-400",
    badgeColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  },
}

export function ScenarioPanel({
  country,
  scenarios,
  context,
  sources,
  reasoningSummary,
  recommendations,
  loading,
  onClose,
}: ScenarioPanelProps) {
  if (!country) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-screen w-full lg:w-[650px] bg-background border-l shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold truncate">
              {country}
            </h2>
            <p className="text-sm text-muted-foreground">
              Scenariusze przyszłości geopolitycznej
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">
                  Analizuję sytuację geopolityczną...
                </p>
                <p className="text-sm text-muted-foreground mt-2 text-center px-4">
                  Przetwarzam dane z oficjalnych źródeł i generuję scenariusze z
                  chain of thought
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>Powered by DeepSeek R1 (reasoning model)</span>
                </div>
              </motion.div>
            )}

            {/* Content */}
            {!loading && scenarios && context && (
              <Tabs defaultValue="scenarios" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="scenarios">Scenariusze</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Rekomendacje
                  </TabsTrigger>
                  <TabsTrigger value="reasoning">
                    <Network className="w-3 h-3 mr-1" />
                    Chain
                  </TabsTrigger>
                  <TabsTrigger value="sources">Źródła</TabsTrigger>
                  <TabsTrigger value="context">Kontekst</TabsTrigger>
                </TabsList>

                <TabsContent value="scenarios" className="space-y-6">
                  {/* Grid 2x2 for scenarios */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {scenarios.map((scenario, index) => {
                      const config =
                        scenarioConfig[scenario.type] || scenarioConfig.positive
                      const Icon = config?.icon || TrendingUp

                      return (
                        <motion.div
                          key={`${scenario.type}-${scenario.timeframe}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`${config.borderColor} ${config.bgColor} transition-all duration-300 hover:shadow-lg h-full`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div
                                    className={`p-2 rounded-lg bg-background ${config.color} shrink-0`}
                                  >
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${config.badgeColor} border-0`}
                                      >
                                        {scenario.type === "positive"
                                          ? "Pozytywny"
                                          : "Negatywny"}
                                      </Badge>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {scenario.timeframe === "12"
                                          ? "12 miesięcy"
                                          : "36 miesięcy"}
                                      </Badge>
                                    </div>
                                    <CardTitle className="text-sm sm:text-base leading-tight">
                                      {scenario.title}
                                    </CardTitle>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                                {scenario.description}
                              </p>

                              {/* Impact on Atlantis */}
                              <div>
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-primary rounded-full" />
                                  Wpływ na Atlantis
                                </h4>
                                <div className="space-y-2">
                                  {[
                                    { key: "economy", label: "Gospodarka" },
                                    {
                                      key: "security",
                                      label: "Bezpieczeństwo",
                                    },
                                    { key: "energy", label: "Energia" },
                                    { key: "technology", label: "Technologia" },
                                  ].map(({ key, label }) => {
                                    const value =
                                      scenario.impact_on_atlantis[
                                        key as keyof typeof scenario.impact_on_atlantis
                                      ]
                                    const isPositive = value > 0
                                    const percentage = Math.abs(value) * 10 // scale to 0-100

                                    return (
                                      <div key={key} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-muted-foreground">
                                            {label}
                                          </span>
                                          <span
                                            className={`font-bold ${
                                              isPositive
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                            }`}
                                          >
                                            {value > 0 ? "+" : ""}
                                            {value}
                                          </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className={`h-full ${
                                              isPositive
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            } transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-primary rounded-full" />
                                  Kluczowe czynniki
                                </h4>
                                <ul className="space-y-1.5">
                                  {scenario.keyFactors
                                    .slice(0, 3)
                                    .map((factor, idx) => (
                                      <li
                                        key={idx}
                                        className="text-xs flex items-start gap-2"
                                      >
                                        <span
                                          className={`${config.color} mt-0.5 font-bold`}
                                        >
                                          •
                                        </span>
                                        <span className="text-foreground/80">
                                          {factor}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* RECOMMENDATIONS Tab */}
                <TabsContent value="recommendations" className="space-y-6">
                  {recommendations ? (
                    <>
                      {/* Avoid Negative Scenarios */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="border-red-200 dark:border-red-800">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                              Jak uniknąć scenariuszy negatywnych
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {recommendations.avoid_negative.map(
                                (item, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start gap-3 pb-2 border-b border-border last:border-0 last:pb-0"
                                  >
                                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                    <span className="text-foreground/90">
                                      {item}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Achieve Positive Scenarios */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Card className="border-green-200 dark:border-green-800">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                              Jak osiągnąć scenariusze pozytywne
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {recommendations.achieve_positive.map(
                                (item, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start gap-3 pb-2 border-b border-border last:border-0 last:pb-0"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-foreground/90">
                                      {item}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Priority Actions */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="border-primary/50">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              Działania priorytetowe
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {recommendations.priority_actions.map(
                                (action, idx) => {
                                  const impactColors = {
                                    high: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
                                    medium:
                                      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
                                    low: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
                                  }

                                  return (
                                    <Card key={idx} className="bg-muted/30">
                                      <CardContent className="pt-4">
                                        <div className="space-y-2">
                                          <div className="flex items-start justify-between gap-3">
                                            <p className="text-sm font-medium flex-1">
                                              {action.action}
                                            </p>
                                            <Badge
                                              variant="outline"
                                              className={`text-xs shrink-0 ${
                                                impactColors[action.impact]
                                              }`}
                                            >
                                              {action.impact === "high"
                                                ? "Wysoki"
                                                : action.impact === "medium"
                                                ? "Średni"
                                                : "Niski"}{" "}
                                              priorytet
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            <span>{action.timeframe}</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )
                                }
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground text-center">
                          Brak rekomendacji
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="context" className="space-y-6">
                  {/* Current Situation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Aktualna sytuacja
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {context.currentSituation}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Geopolitical Factors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Czynniki geopolityczne
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {context.geopoliticalFactors.map((factor, idx) => (
                            <li
                              key={idx}
                              className="text-sm flex items-start gap-3"
                            >
                              <Badge
                                variant="secondary"
                                className="mt-0.5 shrink-0"
                              >
                                {idx + 1}
                              </Badge>
                              <span className="text-muted-foreground">
                                {factor}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recent News */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Najważniejsze wydarzenia
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {context.recentNews.map((news, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3 py-1"
                            >
                              {news}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* CHAIN OF THOUGHT Tab */}
                <TabsContent value="reasoning" className="space-y-6">
                  {/* Reasoning Summary */}
                  {reasoningSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-primary/50">
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Network className="w-4 h-4 text-primary" />
                            Ścieżka Analityczna
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {reasoningSummary}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Reasoning per Scenario */}
                  {scenarios.map((scenario, index) => {
                    const config =
                      scenarioConfig[scenario.type] || scenarioConfig.positive
                    return (
                      <motion.div
                        key={`${scenario.type}-${scenario.timeframe}-reasoning`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 1) * 0.1 }}
                      >
                        <Card className={config.borderColor}>
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${config.color.replace(
                                  "text-",
                                  "bg-"
                                )}`}
                              />
                              Chain of Thought: {scenario.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {scenario.reasoning.map((step, idx) => {
                                // Jeśli step jest stringiem, renderuj jako prosty punkt
                                if (typeof step === "string") {
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-2 pb-2 border-b border-border last:border-0"
                                    >
                                      <div
                                        className={`w-5 h-5 rounded-full ${config.badgeColor} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}
                                      >
                                        {idx + 1}
                                      </div>
                                      <p className="text-sm">{step}</p>
                                    </div>
                                  )
                                }

                                // Jeśli step jest obiektem, renderuj pełną strukturę
                                return (
                                  <div
                                    key={step.step}
                                    className="relative pl-6 pb-4 last:pb-0"
                                  >
                                    {/* Timeline connector */}
                                    {step.step < scenario.reasoning.length && (
                                      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                                    )}

                                    {/* Step badge */}
                                    <div
                                      className={`absolute left-0 top-1 w-6 h-6 rounded-full ${config.badgeColor} flex items-center justify-center text-xs font-bold`}
                                    >
                                      {step.step}
                                    </div>

                                    <div className="space-y-2">
                                      {/* Fact */}
                                      <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                          Fakt
                                        </p>
                                        <p className="text-sm">{step.fact}</p>
                                      </div>

                                      {/* Conclusion */}
                                      <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                                          Wniosek
                                        </p>
                                        <p className="text-sm font-medium">
                                          {step.conclusion}
                                        </p>
                                      </div>

                                      {/* Weight */}
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-muted-foreground">
                                          Waga czynnika:
                                        </p>
                                        <div className="flex items-center gap-1">
                                          {Array.from({ length: 10 }).map(
                                            (_, i) => (
                                              <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full ${
                                                  i < step.weight
                                                    ? "bg-primary"
                                                    : "bg-border"
                                                }`}
                                              />
                                            )
                                          )}
                                        </div>
                                        <span className="text-xs font-bold text-primary">
                                          {step.weight}/10
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </TabsContent>

                {/* SOURCES Tab */}
                <TabsContent value="sources" className="space-y-4">
                  {sources && sources.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ExternalLink className="w-4 h-4" />
                        <p>
                          Znaleziono {sources.length} źródeł użytych w analizie
                        </p>
                      </div>

                      {sources
                        .sort((a, b) => b.relevance - a.relevance)
                        .map((source, idx) => {
                          const reliabilityConf =
                            reliabilityConfig[source.reliability]
                          const ReliabilityIcon = reliabilityConf.icon

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                  <div className="space-y-3">
                                    {/* Title & Link */}
                                    <div>
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium hover:text-primary transition-colors flex items-start gap-2 group"
                                      >
                                        <span className="flex-1">
                                          {source.title}
                                        </span>
                                        <ExternalLink className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </a>
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${reliabilityConf.badgeColor} border-0`}
                                      >
                                        <ReliabilityIcon className="w-3 h-3 mr-1" />
                                        {reliabilityConf.label}
                                      </Badge>

                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {source.date}
                                      </Badge>

                                      {/* Relevance score */}
                                      <div className="flex items-center gap-1">
                                        {Array.from({ length: 10 }).map(
                                          (_, i) => (
                                            <div
                                              key={i}
                                              className={`w-1.5 h-1.5 rounded-full ${
                                                i < source.relevance
                                                  ? "bg-primary"
                                                  : "bg-border"
                                              }`}
                                            />
                                          )
                                        )}
                                        <span className="text-xs text-muted-foreground ml-1">
                                          {source.relevance}/10
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                    </>
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground text-center">
                          Brak dostępnych źródeł
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
